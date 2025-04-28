import { ethers } from "ethers"
import toast from "react-hot-toast";

let signer;
let address;

export const connectMetaMask = async () => {
  if (signer && address) {
    return { signer, address };
  }

  if (typeof window.ethereum === "undefined") {
    toast.error("Please install a compatible ETH wallet");
    return;
  }
  
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const network = await provider.getNetwork();

  if (network.chainId === 43113) {
    signer = provider.getSigner();
    address = await signer.getAddress();
    return { signer, address };
  }

  try {
    await provider.send("wallet_switchEthereumChain", [{ chainId: "0xa869" }]);
  } catch (error) {
    if (error.code === 4902) {
      try {
        await provider.send('wallet_addEthereumChain', [
            {
              chainId: "0xa869",
              chainName: 'Avalanche Fuji Testnet',
              nativeCurrency: {
                name: 'AVAX',
                symbol: 'AVAX',
                decimals: 18,
              },
              rpcUrls: ['https://api.avax-test.network'],
              blockExplorerUrls: ['https://testnet.snowtrace.io'],
            },
          ],
        );
        await provider.send("wallet_switchEthereumChain", [{ chainId: "0xa869" }]);
      } catch (error) {
        toast.error("error adding avalanche fuji testnet");
        return;
      }
    } else {
      toast.error("error switching network");
      return;
    }
  }

  signer = provider.getSigner();
  address = await signer.getAddress();
  
  return { signer, address };
}

export const connectPhantom = () => {
  toast.error("Phantom wallet is not supported yet, please use metamask");
}

export const connectCoinbase = () => {
  toast.error("Coinbase wallet is not supported yet, please use metamask");
}

export const connectWalletConnect = () => {
  toast.error("Wallet Connect is not supported yet, please use metamask");
}
