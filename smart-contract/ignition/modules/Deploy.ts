0xE156025451041bAD85cFC271854A327e6f907319n// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CertModule = buildModule("CertModule", (m) => { 
  const cert = m.contract("CertNFT", [
    "Test Certificate",
    "TC",
    0,
    "0xe156025451041bad85cfc271854a327e6f907319" // blockchain wallet address
  ]);

  return { cert }; 
})

export default CertModule;
