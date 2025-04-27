import pinataSDK from "@pinata/sdk";
import { images } from "../utils/constants";
import { PINATA_API_KEY, PINATA_SECRET } from "../utils/env";

export default async function createMetadataURI(certName: string, name: string, type: string, description: string): Promise<`ipfs://${string}` | undefined> {
  try {
    const pinata = new pinataSDK(PINATA_API_KEY, PINATA_SECRET);
    const image = images[type as keyof typeof images];

    const metadata = {
      name: certName,
      description,
      image,
      attributes: [
        {
          trait_type: "Certificate Owner Name",
          value: name,
        },
      ],
    };

    const result = await pinata.pinJSONToIPFS(metadata);
    return `ipfs://${result.IpfsHash}`
  } catch (error: any) {
    console.error("Error uploading metadata", error.message)
  }
}