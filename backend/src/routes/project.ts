import { PrismaClient } from "@prisma/client";
import axios from "axios";
import crypto from "crypto";
import dotenv from "dotenv";
import { ethers } from "ethers";
import express from "express";
import FormData from "form-data";
import fs from "fs";
import multer from "multer";
import registryArtifact from '../../../blockchain/artifacts/contracts/BlueCarbonRegistry.sol/BlueCarbonRegistry.json' with { type: "json" };

dotenv.config();

function generateHash(metadata: any) {
    const dataString = JSON.stringify(metadata);
    return crypto.createHash("sha256").update(dataString).digest("hex");
}

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const wallet = new ethers.Wallet(process.env.DEPLOYER_KEY!, provider);
const registryAddress = process.env.REGISTRY_ADDRESS!;
const registry = new ethers.Contract(registryAddress, registryArtifact.abi, wallet);

const projectRouter = express();
const upload = multer({ dest: "uploads/" });
const prisma = new PrismaClient();

const PINATA_JWT = process.env.JWT;

projectRouter.post("/ngo", async (req, res) => {
    try {
        const ngo = await prisma.nGO.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                wallet: "Bn4UKo9aYYEq37fHQPoUAmBSAQvV8gEwytZdJ1GGfuXz",
            },
        });
        res.json({ status: "success", ngo });
    } catch (err: any) {
        res.status(400).json({ status: "error", error: err.message });
    }
});


projectRouter.post("/upload", upload.array("files"), async (req, res) => {
    const { ngoId, name, location, area, type } = req.body;
    const typeUpper = type.toUpperCase();
    if (!["MANGROVE", "SEAGRASS", "SALTMARSH", "TIDAL_WETLANDS"].includes(typeUpper)) {
        return res.status(400).json({ status: "error", error: "Invalid project type" });
    }
    const files = req.files as Express.Multer.File[];
    console.log("Received upload request:", { ngoId, name, location, area, type, files });
    const date_planted = "2023-01-01"; // Hardcoded for now

    if (!ngoId || !name || !location || !area || !type || !date_planted) {
        return res.status(400).json({ status: "error", error: "Missing required fields" });
    }

    if (!files || files.length === 0) {
        return res.status(400).json({ status: "error", error: "No files uploaded" });
    }

    try {

        const cids: string[] = [];
        for (const file of files) {
            const formData = new FormData();
            formData.append("file", fs.createReadStream(file.path));

            const result = await axios.post(
                "https://api.pinata.cloud/pinning/pinFileToIPFS",
                formData,
                { headers: { "Authorization": `Bearer ${PINATA_JWT}`, ...formData.getHeaders() } }
            );
            cids.push(result.data.IpfsHash);
        }

        const metadataHash = generateHash({ name, location, area, type, date_planted, cids });

        const createdProject = await prisma.project.create({
            data: {
                ngoId: parseInt(ngoId),
                name,
                location,
                date_planted: new Date(date_planted),
                area: parseFloat(area),
                type: typeUpper,
                fileCids: cids,
                metadataHash,
                status: "PENDING",
            },
        });

        // Push to blockchain
        const ngo = await prisma.nGO.findUnique({ where: { id: parseInt(ngoId) } });
        if (!ngo) throw new Error("NGO not found");

        const bytes32Hash = ethers.getBytes("0x" + metadataHash);
        //@ts-ignore
        const tx = await registry.connect(wallet).createProject(bytes32Hash, cids);
        await tx.wait();
        console.log("Transaction:", tx);

        res.json({
            status: "success",
            cids,
            uri: cids.map(cid => `ipfs://${cid}`),
            gateway: cids.map(cid => `https://gateway.pinata.cloud/ipfs/${cid}`),
            project: createdProject,
            txHash: tx.hash,
        });
    } catch (err: any) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ status: "error", error: err.message });
    }
});

projectRouter.get("/all", async (req, res) => {
    try {
        const projects = await prisma.project.findMany({ include: { ngo_name: true } });
        res.json(projects);
    } catch (err: any) {
        res.status(500).json({ status: "error", error: err.message });
    }
});

export default projectRouter;
