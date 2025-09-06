import { ethers } from "ethers";

// Setup provider (same as your local Hardhat node)
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// Token contract
const tokenAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; // CarbonCreditToken deployed address
const tokenABI = [
    "function balanceOf(address) view returns (uint256)"
];

const token = new ethers.Contract(tokenAddress, tokenABI, provider);

// NGO wallet address
const ngoAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

async function checkBalance() {
    const balance = await token.balanceOf(ngoAddress);
    console.log("Token balance:", balance.toString());
}

checkBalance();
