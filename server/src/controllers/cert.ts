import type { Request, Response } from "express";
import httpStatus from 'http-status';
import logger from "../configs/logger";
import certificateModel from "../models/certificateSchema";
import certOwner from "../models/certOwner";
import cryptoRandomString from "crypto-random-string";
import { revenue } from "../models/revenueModel";
import { format } from "date-fns";
import { sendMinterEmail } from "../utils/sendEmail";
import { BLOCK_EXPLORER } from "../utils/constants";
import createMetadataURI from "../pinata/pinata";

type revenueType = {
  amount: number,
  Minters: number,
  Month: string,
  email: string
}

const createCert = async (req: Request, res: Response) => {
  try {
    const certId = cryptoRandomString({ length: 8, type: "alphanumeric" });
    req.body.certId = certId;

    const { owner } = req.body;
    const updateCreator = await certOwner.findOne({ email: owner });
    
    if (!updateCreator) {
      res.status(httpStatus.BAD_REQUEST).json({ message: "Invalid certificate owner" });
      return;
    }

    const createdCertificate = new certificateModel(req.body);
    createdCertificate.save();

    updateCreator.certificates.push(createdCertificate._id);
    updateCreator.save();

    res.status(httpStatus.CREATED).json({ message: "Certificate created", certId });
  } catch (error: any) {
    logger.error(`Error saving certificate: ${error.messag}`);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
}

const certificateInfo = async (req: Request, res: Response) => { 
  try {
    const { certId } = req.params;
    const certificateInfo = await certificateModel.findOne({ certId });

    if (!certificateInfo) {
      res.status(httpStatus.BAD_REQUEST).json({ error: "Invalid certificate id" })
      return;
    }

    res.status(httpStatus.OK).json({ message: "Certificate details found", certificateInfo })
  } catch (error: any) {
    logger.error(`Error fetching certificate information: ${error.message}`);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" })
  }
}

const mintedCert = async (req: Request, res: Response) => {
  try {
    const { certId, name, amount, email, hash } = req.body;

    const checkMinter = name as string;
    const Amount = amount! as unknown as number;

    const date = new Date();
    const Month = format(date, "MMM");

    const certCheck = await certificateModel.findOne({ certId });
    if (!certCheck) {
      res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Invalid certificate id" });
      return;
    }

    const { users } = certCheck;

    if (users.length > 0) {
      for (let i = 0; i <= users.length; i++) {
        const user = users.find((user) => user.name === checkMinter)
        if (user) {
          res
            .status(httpStatus.BAD_REQUEST)
            .json({ error: "User has already minted" });
          return;
        }
      }
    }

    const userProp = {
      name: checkMinter,
      certName: certCheck.certificateName,
      date
    }

    certCheck.minted += 1;
    certCheck.totalAmount += certCheck.mintPrice!;
    certCheck.users.push(userProp);
    certCheck.save();

    const { owner } = certCheck;
    const certCreator = await certOwner.findOne({ email: owner });
    if (!certCreator) {
      res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Invalid certificate owner" });
      return;
    }

    certCreator.totalRevenue += certCheck.mintPrice!;
    certCreator.totalMinters += 1;
    certCreator.walletBalance += certCheck.mintPrice!;
    certCreator.save()

    let revenueProp: revenueType;

    const revenueExists = await revenue.find({ email: certCheck.owner });
    if (revenueExists.length === 0) {
      revenueProp = {
        amount: Amount,
        Minters: 1,
        Month,
        email: certCheck.owner
      };

      const newRevenue = new revenue(revenueProp);
      await newRevenue.save();
    } else {
      const existingRevenue = revenueExists.find(
        (revenueRecord) => revenueRecord.Month === Month
      );

      if (!existingRevenue) {
        revenueProp = {
          amount: Amount,
          Minters: 1,
          Month,
          email: certCheck.owner,
        };

        const newRevenue = new revenue(revenueProp);
        await newRevenue.save();
        return;
      };

      existingRevenue.Minters += 1;
      existingRevenue.amount += Amount;
      await existingRevenue.save();
    };

    await minterEmail(email, checkMinter, certCheck.certificateName, hash);
    res.status(httpStatus.OK).json({ message: "Minted info saved" });
  } catch (error: any) {
    logger.error(`Error updating minted certificates: ${error.message}`);
    console.dir(error)
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" })
  }
}

const getRevenue = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const revenueInfo = await revenue.find({ email }).select("-_id -email")

    res.status(httpStatus.OK).json({ message: "Revenue fetched", revenueInfo })
  } catch (error: any) {
    logger.error(`Error fetching revenue: ${error.message}`)
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" })
  }
};

const createMetadata = async (req: Request, res: Response) => {
  try {
    const { certificateName, name, type, description } = req.body;

    const metadataURI = await createMetadataURI(certificateName, name, type, description);

    res.status(httpStatus.OK).json({ message: "Metadata created and sent", metadataURI })
  } catch (error: any) {
    logger.error(`Error creting metadata: ${error.message}`)
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" })
  }
}

const minterEmail = async (email: string, name: string, certificateName: string, hash: string) => {
  try {
    const emailProp = {
      username: name,
      email: email,
      certificateName: certificateName,
    };

    const txUrl = `${BLOCK_EXPLORER}/tx/${hash}`;

    await sendMinterEmail(
      emailProp,
      `${certificateName} minted successfully! 🎉`,
      txUrl
    );
  } catch (error: any) {
    logger.error(`Error sending minter email: ${error.message}`);
  }
};

export { certificateInfo, createCert, mintedCert, createMetadata, getRevenue };