import {
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import { config } from "../config";
import QRCode from "qrcode";

const s3Client = new S3Client({
  endpoint: config.spaceEndpoint,
  region: "sgp1",
  credentials: {
    accessKeyId: config.spaceAccessKeyId,
    secretAccessKey: config.spaceSecretAccessKey,
  },
});
export const assetUpload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "msquarefdc",
    acl: "public-read",
    key: (request, file, cb) => {
      cb(
        null,
        `foodie-pos/msquarefdc-batch3/msquareprogramming/${Date.now()}_${
          file.originalname
        }`
      );
    },
  }),
}).single("file");

//to create QR code for tables

//generateLinkForQrCode is for creating URL with tableId
export const generateLinkForQRCode = (tableId: number) => {
  return `${config.orderAppUrl}?tableId=${tableId}`;
};

export const qrCodeImageUpload = async (tableId: number) => {
  
  try {
    
    //This is for hidding "url with table" behind QRcode image
    const qrImageData = await QRCode.toDataURL(generateLinkForQRCode(tableId), {
      scale: 20,
    });
    //Input is for uploading image directly to digitalocean with s3-client
    const input = {
      Bucket: "msquarefdc",
      Key: `foodie-pos/msquarefdc-batch3/msquareprogramming/qrcode/tableId-${tableId}.png`,
      ACL: ObjectCannedACL.public_read,
      Body: Buffer.from(
        //It's need to memorize to replace base64
        qrImageData.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      ),
    };

    const command = new PutObjectCommand(input);
    await s3Client.send(command);
    return `https://msquarefdc.sgp1.cdn.digitaloceanspaces.com/foodie-pos/msquarefdc-batch3/msquareprogramming/qrcode/tableId-${tableId}.png`;
  } catch (err) {
    console.log(err);
  }
};
