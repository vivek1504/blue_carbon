const hre = require("hardhat");

async function main() {
    // 1. Deploy CarbonCreditToken
    const Token = await hre.ethers.getContractFactory("CarbonCreditToken");
    const token = await Token.deploy();
    await token.waitForDeployment();
    console.log("CarbonCreditToken deployed to:", await token.getAddress());

    // 2. Deploy BlueCarbonRegistry
    const Registry = await hre.ethers.getContractFactory("BlueCarbonRegistry");
    const registry = await Registry.deploy(await token.getAddress());
    await registry.waitForDeployment();
    console.log("BlueCarbonRegistry deployed to:", await registry.getAddress());

    // 3. Link token to registry (so registry can mint)
    const tx = await token.setRegistry(await registry.getAddress());
    await tx.wait();
    console.log("Registry set as token minter ✅");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
