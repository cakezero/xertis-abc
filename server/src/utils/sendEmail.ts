import nodemailer from "nodemailer";
import hbs, { type NodemailerExpressHandlebarsOptions } from "nodemailer-express-handlebars";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import logger from "../configs/logger";
import { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASSWORD } from "./env";
import type { emailUser, Options, MailOptions } from "../types/types";

const __dirname = dirname(fileURLToPath(import.meta.url));

const transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD
  }
});

const options: NodemailerExpressHandlebarsOptions = {
  viewEngine: {
    partialsDir: path.resolve(__dirname, "../utils/templates"),
    defaultLayout: false
  },
  viewPath: path.resolve(__dirname, "../utils/templates")
};

transporter.use("compile", hbs(options));


export const sendRegisterEmail = async (user: emailUser, subject: string) => {
  try {
    await transporter.sendMail({
      from: EMAIL_USER,
      to: user.email,
      subject: subject,
      template: "register",
      context: {
        username: user.username
      }
    } as MailOptions);
  } catch (error: any) {
    logger.error(`Error sending register email: ${error.message}`)
    throw new Error("Error sending Register mail");
  }
};

export const sendLoginEmail = async (user: emailUser, subject: string) => {
  try {
    await transporter.sendMail({
      from: EMAIL_USER,
      to: user.email,
      template: "login",
      subject: subject,
      context: {
        username: user.username
      }
    } as MailOptions)
  } catch (error: any) {
    logger.error(`Error sending login email: ${error.message}`);
    throw new Error("Error sending Login mail");
  }
};

export const sendMintEmail = async (user: emailUser, subject: string) => {
  try {
    if (user.totalAmount! > 0) {
      await transporter.sendMail({
        from: EMAIL_USER,
        to: user.email,
        template: "mintwithPrice",
        subject: subject,
        context: {
          username: user.username,
          minter: user.minter,
          minted: user.minted,
          certName: user.certificateName,
          mintPrice: user.mintPrice,
          mintId: user.certId,
          totalAmount: user.totalAmount
        },
      } as MailOptions);
    } else {
      await transporter.sendMail({
        from: EMAIL_USER,
        to: user.email,
        template: "mintWithoutPrice",
        subject: subject,
        context: {
          username: user.username,
          minter: user.minter,
          minted: user.minted,
          certName: user.certificateName,
        },
      } as MailOptions);
    }
  } catch (error: any) {
    logger.error(`Error sending mint email: ${error.message}`);
    throw new Error("Error sending Mint mail");
  }
};

export const sendCreateCertificateEmail = async (user: emailUser, subject: string, txUrl: string) => {
  try {
    if (user.mintPrice! > 0) {
      await transporter.sendMail({
        from: EMAIL_USER,
        to: user.email,
        template: "createCert",
        subject: subject,
        context: {
          username: user.username,
          mintId: user.certId,
          mintPrice: user.mintPrice,
          ETHEquivalent: user.ETHEquivalent,
          txUrl
        }
      } as MailOptions);
    } else {
      await transporter.sendMail({
      from: EMAIL_USER,
      to: user.email,
      template: "createCertWithoutPrice",
      subject: subject,
      context: {
        username: user.username,
        mintId: user.certId,
        txUrl
      }
    } as MailOptions)
    }
  } catch (error: any) {
    logger.error(`Error sending createCert email: ${error.message}`);
    throw new Error("Error sending certificate created mail");
  }
};

export const sendMinterEmail = async (user: emailUser, subject: string, txUrl: string) => {
  try {
    await transporter.sendMail({
      from: EMAIL_USER,
      to: user.email,
      template: "minter",
      subject: subject,
      context: {
        username: user.username,
        certificate: user.certificateName,
        txUrl
      },
    } as MailOptions);
  } catch (error: any) {
    logger.error(`Error sending minter email: ${error.message}`);
    throw new Error("Error sending minter mail");
  }
};

export const sendWithdrawEmail = async (user: emailUser, subject: string, withdrawalOptions: Options) => {
  try {
    await transporter.sendMail({
      from: EMAIL_USER,
      to: user.email,
      template: "withdraw",
      subject: subject,
      context: {
        username: user.username,
        amount: withdrawalOptions.amount,
        txUrl: withdrawalOptions.txUrl
      },
    } as MailOptions);
  } catch (error: any) {
    logger.error(`Error sending minter email: ${error.message}`);
    throw new Error("Error sending minter mail");
  }
}
