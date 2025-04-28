import type { Request } from "express";
import nodemailer from "nodemailer"

export interface CustomRequest extends Request { 
  user?: object | string
}

export type User = {
  email: String | undefined,
  walletAddress: String | undefined,
}

export interface MailOptions extends nodemailer.SendMailOptions {
  template?: string;
  context?: {
    [key: string]: any;
  };
}

export type Options = {
  amount: number,
  txUrl: string
}

export interface emailUser {
  username: string;
  email: string;
  certId?: string;
  minter?: string;
  minted?: number;
  certificateName?: string;
  ETHEquivalent?: number;
  mintPrice?: number;
  totalAmount?: number;
}