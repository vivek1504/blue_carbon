import { PrismaClient } from "@prisma/client";
import { ethers } from "ethers";
import express from "express";
import registryArtifact from '../../../blockchain/artifacts/contracts/BlueCarbonRegistry.sol/BlueCarbonRegistry.json' with { type: "json" };

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const wallet = new ethers.Wallet(process.env.DEPLOYER_KEY!, provider);
const registryAddress = process.env.REGISTRY_ADDRESS!;
const registry = new ethers.Contract(registryAddress, registryArtifact.abi, wallet);

const nccrRouter = express();
const prisma = new PrismaClient();

//temporary variables 
let approvedCount = 0;
let rejectedCount = 0;
let pendingCount = 0;

nccrRouter.get("/stats", async (req, res) => {
    try {
        res.json({ approvedCount, rejectedCount, pendingCount });
    } catch (err: any) {
        res.status(500).json({ status: "error", error: err.message });
    }
});


nccrRouter.get("/pending", async (req, res) => {
    console.log("Fetching pending projects...");
    const pending = await prisma.project.findMany({
        include: { ngo_name: true }
    });
    console.log(pending);
    res.json(pending);
});


nccrRouter.post("/projects/:id/approve", async (req, res) => {
    const { id } = req.params;

    const carbonFactors: Record<string, number> = {
        mangrove: 8,
        seagrass: 2,
        saltmarsh: 4,
        tidal_wetlands: 5
    };

    try {
        const project = await prisma.project.findUnique({ where: { id: Number(id) } });
        if (!project) return res.status(404).json({ error: "Project not found" });
        console.log("Project:", project);

        const type = project.type.toLowerCase();
        const factor = carbonFactors[type];
        if (!factor) return res.status(400).json({ error: `Unknown project type: ${project.type}` });
        console.log("Factor:", factor);


        const credits = project.area * factor;
        const bytes32Hash = ethers.getBytes("0x" + project.metadataHash);

        //@ts-ignore
        // const tx = await registry.approveProject(bytes32Hash, credits);
        // await tx.wait();

        const updated = await prisma.project.update({
            where: { id: Number(id) },
            data: { status: "APPROVED", credits },
        });
        console.log("Updated project:", updated);

        res.json({ status: "success", project: updated });
    } catch (err: any) {
        res.status(400).json({ status: "error", error: err.message });
    }
});


nccrRouter.post("/projects/:id/reject", async (req, res) => {
    const { id } = req.params;
    const { reason } = req.body;

    if (!reason) {
        return res.status(400).json({ status: "error", error: "Rejection reason required" });
    }

    try {
        //@ts-ignore
        const tx = await registry.rejectProject(Number(id), reason);
        await tx.wait();

        const updated = await prisma.project.update({
            where: { id: Number(id) },
            data: { status: "REJECTED" },
        });

        res.json({ status: "success", project: updated, txHash: tx.hash });
    } catch (err: any) {
        res.status(400).json({ status: "error", error: err.message });
    }
});

export default nccrRouter;
