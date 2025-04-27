import express from "express";
import {
  createEmail,
  mintedEmail,
  creatorRegister,
  history,
  creatorLogin,
  getRevenue,
  getWallet,
  setWallet,
  fetchAssets,
  withdrawEmail
} from "../controllers/creator"; 

const router = express.Router();

router
  .get("/history", history)
  .get("/get-revenue", getRevenue)
  .get("/get-assets", fetchAssets)
  .get("/get-wallet", getWallet)
  .post("/create-email", createEmail)
  .post("/withdraw-email", withdrawEmail)
  .post("/minted", mintedEmail)
  .post("/set-wallet", setWallet)
  .post("/register", creatorRegister)
  .post("/login", creatorLogin)

export default router;
