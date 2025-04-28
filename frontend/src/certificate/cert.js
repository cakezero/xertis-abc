import { ethers } from "ethers"
import {
  certAbi,
  certBytecode,
  walletBytecode,
  walletAbi,
} from "./cert/certProp";
import axios from "axios"
import { API } from "../constants/constants";
import { connectMetaMask } from "../components/Wallet/wallet"

const getSigner = async () => {
  const wallet = await connectMetaMask();
  return wallet?.signer;
}

export const withdrawProfits = async (email) => {
  try {
    const response = await axios.get(`${API}/creator/get-wallet?email=${email}`)
    const withdrawWallet = response.data.wallet;
    const signer = await getSigner();
    
    const withdrawContract = new ethers.Contract(withdrawWallet, walletAbi, signer);

    const withdrawn = await withdrawContract.withdraw();

    await withdrawn.wait();

    const hash = withdrawn.hash
    await axios.post(`${API}/creator/withdraw-email`, { email, hash })
  } catch (error) {
    console.error("Error withdrawing profits:", error);
    throw new Error("Error withdrawing profits");
  }
}

const createWallet = async () => {
  try {
    const signer = await getSigner();

    const walletFactory = new ethers.ContractFactory(walletAbi, walletBytecode, signer);
    const deployedWallet = await walletFactory.deploy();
    
    await deployedWallet.deployTransaction.wait();
    return deployedWallet.address;
  } catch (error) {
    console.error("Error creating smart contract wallet:", error)
    throw new Error("Error creating smart contract wallet")
  }
}

export const createCertificate = async (email, name, symbol, price) => {
  try {
    const signer = await getSigner();

    const response = await axios.get(`${API}/creator/get-wallet?email=${email}`);
    const wallet = response.data.wallet;
    let tx;
    let certificateAddress;

    if (!wallet) {
      const wallet = await createWallet();
      const certificateFactory = new ethers.ContractFactory(certAbi, certBytecode, signer);

      const deployedCertificate = await certificateFactory.deploy(name, symbol, price, wallet);
  
      const certReceipt = await deployedCertificate.deployTransaction.wait();

      await axios.post(`${API}/creator/set-wallet`, { email, wallet });
      tx = certReceipt.transactionHash;
      certificateAddress = deployedCertificate.address;
  
      return { tx, certificateAddress };
    }

    const certificateFactory = new ethers.ContractFactory(certAbi, certBytecode, signer);

    const deployedCertificate = await certificateFactory.deploy(name, symbol, price, wallet);

    const certReceipt = await deployedCertificate.deployTransaction.wait();

    tx = certReceipt.transactionHash;
    certificateAddress = deployedCertificate.address;

    return { tx, certificateAddress };
  } catch (error) {
    console.error("Error creating certificate:", error)
    throw new Error("Error creating certificate");
  }
}

export const mintCertificate = async (contract, name, certificateName, description, type, price, certUrl, email) => {
  
  try {
    const signer = await getSigner();
    
    const response = await axios.post(`${API}/certificates/get-metadata-url`, { certificateName, name, type, description });

    const metadataURI = response.data.metadataURI;
    const certificateContract = new ethers.Contract(contract, certAbi, signer);

    if (price === 0) {
      const minted = await certificateContract.NoPriceMint(metadataURI, { gasLimit: 10000000 });
  
      await minted.wait();
  
      await axios.post(`${API}/creator/minted`, {
        email,
        name,
        certUrl
      });
      return minted.hash;
    }

    const priceMinted = await certificateContract.PriceMint(metadataURI, {
      value: ethers.utils.parseEther(price.toString()),
      gasLimit: 10000000
    });

    await priceMinted.wait();
    await axios.post(`${API}/creator/minted`, {
      email,
      name,
      certUrl
    });

    return priceMinted.hash;
  } catch (error) {
    throw new Error("Error minting certificate");
  }
}
