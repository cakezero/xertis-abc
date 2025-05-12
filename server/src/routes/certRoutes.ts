import express from "express";
import {
	certificateInfo,
	createMetadata,
	createCert,
	getRevenue,
	mintedCert,
} from "../controllers/cert";

const router = express.Router();

router
	.get("/get-revenue", getRevenue)
	.post("/create-cert", createCert)
	.post("/mint-cert", mintedCert)
	.post("/get-metadata-url", createMetadata)
	.get("/:certId", certificateInfo);

export default router;
