// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./CarbonCreditToken.sol";

contract BlueCarbonRegistry is Ownable {
    CarbonCreditToken public token;

    enum Status {
        PENDING,
        APPROVED,
        REJECTED
    }

    struct Project {
        uint256 id;
        address ngo;
        bytes32 metadataHash; // hash of JSON
        string[] fileCids; // IPFS CID
        Status status;
        string reason;
        uint256 createdAt;
        uint256 updatedAt;
        uint256 credits; // tokens minted on approval
    }

    uint256 public projectCount;
    mapping(uint256 => Project) public projects;
    mapping(address => uint256[]) private projectsByNgo;

    event ProjectCreated(
        uint256 indexed id,
        address indexed ngo,
        bytes32 metadataHash,
        string fileCid
    );
    event ProjectApproved(
        uint256 indexed id,
        address indexed approver,
        uint256 credits
    );
    event ProjectRejected(
        uint256 indexed id,
        address indexed approver,
        string reason
    );

    constructor(address tokenAddress) Ownable(msg.sender) {
        token = CarbonCreditToken(tokenAddress);
    }

    function createProject(
        bytes32 metadataHash,
        string[] calldata fileCids
    ) external returns (uint256 id) {
        require(metadataHash != bytes32(0), "hash required");
        require(fileCids.length > 0, "at least one cid required");

        id = ++projectCount;

        projects[id] = Project({
            id: id,
            ngo: msg.sender,
            metadataHash: metadataHash,
            fileCids: fileCids,
            status: Status.PENDING,
            reason: "",
            createdAt: block.timestamp,
            updatedAt: block.timestamp,
            credits: 0
        });

        projectsByNgo[msg.sender].push(id);

        emit ProjectCreated(id, msg.sender, metadataHash, fileCids[0]); // optionally log first CID
    }

    function approveProject(uint256 id, uint256 credits) external onlyOwner {
        Project storage p = projects[id];
        require(p.id != 0, "not found");
        require(p.status == Status.PENDING, "not pending");
        require(credits > 0, "credits required");

        p.status = Status.APPROVED;
        p.reason = "";
        p.updatedAt = block.timestamp;
        p.credits = credits;

        token.mint(p.ngo, credits * 1e18); // 18 decimals

        emit ProjectApproved(id, msg.sender, credits);
    }

    function rejectProject(
        uint256 id,
        string calldata reason
    ) external onlyOwner {
        Project storage p = projects[id];
        require(p.id != 0, "not found");
        require(p.status == Status.PENDING, "not pending");
        require(bytes(reason).length > 0, "reason required");

        p.status = Status.REJECTED;
        p.reason = reason;
        p.updatedAt = block.timestamp;

        emit ProjectRejected(id, msg.sender, reason);
    }

    function getProjectsByNgo(
        address ngo
    ) external view returns (uint256[] memory) {
        return projectsByNgo[ngo];
    }
}
