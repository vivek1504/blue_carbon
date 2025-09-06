const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("BlueCarbonRegistry", function () {
    async function deployRegistryFixture() {
        const [owner, ngo1, ngo2] = await ethers.getSigners();
        const Registry = await ethers.getContractFactory("BlueCarbonRegistry");
        const registry = await Registry.deploy();

        return { registry, owner, ngo1, ngo2 };
    }

    describe("Deployment", function () {
        it("Should set the deployer as owner", async function () {
            const { registry, owner } = await loadFixture(deployRegistryFixture);
            expect(await registry.owner()).to.equal(owner.address);
        });
    });

    describe("Project creation", function () {
        it("Should allow NGO to create a project", async function () {
            const { registry, ngo1 } = await loadFixture(deployRegistryFixture);

            const hash = ethers.id("test-metadata"); // keccak256, placeholder for sha256
            const cid = "bafy12345";

            await expect(
                registry.connect(ngo1).createProject(hash, cid)
            )
                .to.emit(registry, "ProjectCreated")
                .withArgs(1, ngo1.address, hash, cid);

            const project = await registry.getProject(1);
            expect(project.id).to.equal(1);
            expect(project.ngo).to.equal(ngo1.address);
            expect(project.fileCid).to.equal(cid);
            expect(project.status).to.equal(0); // PENDING
        });

        it("Should revert if hash or CID is missing", async function () {
            const { registry, ngo1 } = await loadFixture(deployRegistryFixture);

            await expect(
                registry.connect(ngo1).createProject(
                    ethers.ZeroHash,
                    "bafy123"
                )
            ).to.be.revertedWith("hash required");

            await expect(
                registry.connect(ngo1).createProject(
                    ethers.id("something"),
                    ""
                )
            ).to.be.revertedWith("cid required");
        });
    });

    describe("Approvals & Rejections", function () {
        it("Should allow owner to approve a project", async function () {
            const { registry, ngo1, owner } = await loadFixture(deployRegistryFixture);

            const hash = ethers.id("approve-test");
            const cid = "bafyapprove";

            await registry.connect(ngo1).createProject(hash, cid);

            await expect(registry.connect(owner).approveProject(1))
                .to.emit(registry, "ProjectApproved")
                .withArgs(1, owner.address);

            const project = await registry.getProject(1);
            expect(project.status).to.equal(1); // APPROVED
        });

        it("Should allow owner to reject a project with reason", async function () {
            const { registry, ngo1, owner } = await loadFixture(deployRegistryFixture);

            const hash = ethers.id("reject-test");
            const cid = "bafyreject";

            await registry.connect(ngo1).createProject(hash, cid);

            await expect(
                registry.connect(owner).rejectProject(1, "Invalid data")
            )
                .to.emit(registry, "ProjectRejected")
                .withArgs(1, owner.address, "Invalid data");

            const project = await registry.getProject(1);
            expect(project.status).to.equal(2); // REJECTED
            expect(project.reason).to.equal("Invalid data");
        });

        it("Should revert if non-owner tries to approve/reject", async function () {
            const { registry, ngo1, ngo2 } = await loadFixture(deployRegistryFixture);

            const hash = ethers.id("fail-test");
            const cid = "bafyfail";
            await registry.connect(ngo1).createProject(hash, cid);

            await expect(
                registry.connect(ngo2).approveProject(1)
            ).to.be.revertedWith("Not owner");

            await expect(
                registry.connect(ngo2).rejectProject(1, "bad")
            ).to.be.revertedWith("Not owner");
        });
    });

    describe("Helpers", function () {
        it("Should return projects by NGO", async function () {
            const { registry, ngo1 } = await loadFixture(deployRegistryFixture);

            const hash1 = ethers.id("p1");
            const hash2 = ethers.id("p2");
            await registry.connect(ngo1).createProject(hash1, "cid1");
            await registry.connect(ngo1).createProject(hash2, "cid2");

            const ids = await registry.getProjectsByNgo(ngo1.address);
            expect(ids.map(id => Number(id))).to.deep.equal([1, 2]);
        });

        it("Should verify metadata hash", async function () {
            const { registry, ngo1 } = await loadFixture(deployRegistryFixture);

            const hash = ethers.id("verify-hash");
            await registry.connect(ngo1).createProject(hash, "cidverify");

            expect(await registry.verifyHash(1, hash)).to.equal(true);
            expect(await registry.verifyHash(1, ethers.id("wrong"))).to.equal(false);
        });
    });

    describe("Ownership", function () {
        it("Should allow owner to transfer ownership", async function () {
            const { registry, owner, ngo1 } = await loadFixture(deployRegistryFixture);

            await registry.connect(owner).transferOwnership(ngo1.address);
            expect(await registry.owner()).to.equal(ngo1.address);
        });

        it("Should revert on zero address transfer", async function () {
            const { registry, owner } = await loadFixture(deployRegistryFixture);

            await expect(
                registry.connect(owner).transferOwnership(ethers.ZeroAddress)
            ).to.be.revertedWith("zero addr");
        });
    });
});
