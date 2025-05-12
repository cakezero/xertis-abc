import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import certOwner from "../models/certOwner";
import logger from "../configs/logger";
import httpStatus from "http-status";
import certificateModel from "../models/certificateSchema";
import {
	sendCreateCertificateEmail,
	sendLoginEmail,
	sendMintEmail,
	sendRegisterEmail,
	sendWithdrawEmail,
} from "../utils/sendEmail";
import { BLOCK_EXPLORER, ETHPrice } from "../utils/constants";

const creatorRegister = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const emailExists = await certOwner.findOne({ email });
		if (emailExists) {
			res.status(httpStatus.FOUND).json({ error: "Email already exists" });
			return;
		}

		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		req.body.password = hashedPassword;

		const newCreator = new certOwner(req.body);
		await newCreator.save();

		const emailProp = {
			username: newCreator.name,
			email: newCreator.email,
		};
		await sendRegisterEmail(emailProp, "Welcome to Xertis 🎉");
		res
			.status(httpStatus.CREATED)
			.json({ message: "Creator registered", userInfo: newCreator });
	} catch (error: any) {
		logger.error(`Error creating creator: ${error.message}`);
		res
			.status(httpStatus.INTERNAL_SERVER_ERROR)
			.json({ error: "Internal server error" });
	}
};

const creatorLogin = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const userExists = await certOwner.findOne({ email });
		if (!userExists) {
			res
				.status(httpStatus.BAD_REQUEST)
				.json({ error: "Invalid credentials or User does not exist" });
			return;
		}

		const passwordCheck = await bcrypt.compare(password, userExists.password);
		if (!passwordCheck) {
			res
				.status(httpStatus.BAD_REQUEST)
				.json({ error: "Invalid credentials or User does not exist" });
			return;
		}

		const emailProp = {
			username: userExists.name,
			email: userExists.email,
		};

		await sendLoginEmail(emailProp, "Login successful");
		res
			.status(httpStatus.OK)
			.json({ message: "User has been logged in", userInfo: userExists });
	} catch (error: any) {
		logger.error(`Error loggin user in: ${error.message}`);
		res
			.status(httpStatus.INTERNAL_SERVER_ERROR)
			.json({ error: "Internal server error" });
	}
};

const history = async (req: Request, res: Response) => {
	try {
		const { email } = req.query;

		const user = await certOwner.findOne({ email });
		if (!user) {
			res.status(httpStatus.NOT_FOUND).json({ error: "User not found" });
			return;
		}

		const historyInfo = await certificateModel
			.find({ owner: email })
			.select("-_id");
		if (!historyInfo) {
			res
				.status(httpStatus.OK)
				.json({ message: "Nothing found", historyInfo: "" });
			return;
		}

		const users = historyInfo
			.map((doc) => doc.users)
			.flat()
			.sort((a, b) => b.date!.getTime() - a.date!.getTime());

		console.log({ users });
		res
			.status(httpStatus.OK)
			.json({ message: "History information sent", historyInfo: users });
	} catch (error: any) {
		logger.error(`Error getting history info: ${error.message}`);
		res
			.status(httpStatus.INTERNAL_SERVER_ERROR)
			.json({ error: "Internal server error" });
	}
};

const getRevenue = async (req: Request, res: Response) => {
	try {
		const { email } = req.query;
		const revInfo = await certOwner.findOne({ email });
		res
			.status(httpStatus.OK)
			.json({
				message: "Total revenue fetched",
				revenue: revInfo?.totalRevenue,
			});
	} catch (error: any) {
		logger.error(`Error getting revenue: ${error.message}`);
		res
			.status(httpStatus.INTERNAL_SERVER_ERROR)
			.json({ error: "Internal server error" });
	}
};

const getWallet = async (req: Request, res: Response) => {
	try {
		const { email } = req.query;

		const walletFetch = await certOwner.findOne({ email });
		if (!walletFetch) {
			res
				.status(httpStatus.BAD_REQUEST)
				.json({ message: "email associated with user doesn't exist" });
			return;
		}
		res
			.status(httpStatus.OK)
			.json({ message: "user found", wallet: walletFetch.walletAddress });
	} catch (error: any) {
		logger.error(`Error getting wallet: ${error.message}`);
		res
			.status(httpStatus.INTERNAL_SERVER_ERROR)
			.json({ error: "Internal Server Error" });
	}
};

const setWallet = async (req: Request, res: Response) => {
	try {
		const { wallet, email } = req.body;

		const walletExists = await certOwner.findOne({ walletAddress: wallet });
		if (walletExists) {
			res.status(httpStatus.OK).json({ message: "wallet already exists" });
			return;
		}

		const setupWallet = await certOwner.findOne({ email });
		setupWallet!.walletAddress = wallet;
		setupWallet!.save();

		res.status(httpStatus.OK).json({ message: "wallet setup" });
	} catch (error: any) {
		logger.error(`Error setting wallet: ${error.message}`);
		res
			.status(httpStatus.INTERNAL_SERVER_ERROR)
			.json({ error: "Internal Server Error" });
	}
};

const createEmail = async (req: Request, res: Response) => {
	try {
		const { email, tx } = req.body;
		const txUrl = `${BLOCK_EXPLORER}/tx/${tx}`;

		const updateCreator = await certOwner.findOne({ email });
		const certificate = await certificateModel.findOne({ owner: email });

		const ETHEquivalent = certificate!.mintPrice! / ETHPrice;

		const emailProp = {
			username: updateCreator!.name,
			email,
			certId: certificate!.certId!,
			mintPrice: certificate!.mintPrice!,
			ETHEquivalent,
		};

		await sendCreateCertificateEmail(
			emailProp,
			"🎉 Certificate Created",
			txUrl
		);
		res
			.status(httpStatus.CREATED)
			.json({ message: "Create certificate email sent" });
	} catch (error: any) {
		logger.error(`Error sending create certificate email: ${error}`);
		res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "internal server error" })
	}
};

const mintedEmail = async (req: Request, res: Response) => {
	try {
		const { name, email, certId } = req.body;

		const certCheck = await certificateModel.findOne({ certId });
		const certCreator = await certOwner.findOne({ email });
		const { certificateName } = certCheck!;

		const emailProp = {
			username: certCreator!.name!,
			email: certCreator!.email!,
			minter: name,
			minted: certCheck!.minted!,
			totalAmount: certCheck!.totalAmount!,
			certificateName,
			certId: certCheck!.certId!,
			mintPrice: certCheck!.mintPrice!,
		};

		await sendMintEmail(emailProp, `${certificateName} Certificate Minted 🥳`);
		res.status(httpStatus.OK).json({ message: "Minting email sent" });
	} catch (error: any) {
		logger.error(`Error sending minting email: ${error.message}`);
	}
};

const withdrawEmail = async (req: Request, res: Response) => {
	try {
		const { email, hash } = req.body;
		const owner = await certOwner.findOne({ email });

		const txUrl = `${BLOCK_EXPLORER}/tx/${hash}`;

		const emailProp = {
			email,
			username: owner?.name!,
		};

		const options = {
			amount: owner?.walletBalance!,
			txUrl,
		};

		owner!.walletBalance! = 0;
		await owner!.save();

		await sendWithdrawEmail(
			emailProp,
			"Wallet has been successfully withdrawn",
			options
		);
		res.status(httpStatus.OK).json({ message: "Withdrawal email sent" });
	} catch (error: any) {
		logger.error(`Error sending withdrawal email: ${error.message}`);
	}
};

const fetchAssets = async (req: Request, res: Response) => {
	try {
		const { email } = req.query;
		const owner = await certOwner.findOne({ email });

		if (!owner) {
			res.status(httpStatus.BAD_REQUEST).json({ error: "User not found" });
			return;
		}

		const responseProp = {
			totalMinters: owner?.totalMinters,
			certificates: owner?.certificates.length,
			walletBalance: owner?.walletBalance,
		};

		res.status(httpStatus.OK).json({ message: "Assets fetched", responseProp });
	} catch (error: any) {
		logger.error(`Error fetching asset balances: ${error.message}`);
	}
};

export {
	createEmail,
	mintedEmail,
	withdrawEmail,
	fetchAssets,
	history,
	creatorRegister,
	creatorLogin,
	getRevenue,
	getWallet,
	setWallet,
};
