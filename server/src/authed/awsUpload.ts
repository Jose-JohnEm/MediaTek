import AWS from 'aws-sdk'
import multiparty from 'multiparty'
import ftt from 'file-type'
import fs from 'fs'
import { Request, Response } from 'express'
import dotenv from 'dotenv';

dotenv.config()

const s3Config = {
    region: process.env.AWS_REGION!,
    accessKeyId: process.env.AWS_ACCESS_ID!,
    secretAccessKey: process.env.AWS_ACCESS_KEY!,
    signatureVersion: 'v4',
}

AWS.config.update(s3Config)

const s3 = new AWS.S3();

const uploadFile = (buffer: Buffer, name: string, type: { ext: string, mime: string }) => {
    const params = {
        ACL: 'public-read',
        Body: buffer,
        Bucket: process.env.AWS_BUCKET_NAME as string,
        ContentType: type.mime,
        Key: `${name}.${type.ext}`,
    };
    return s3.upload(params).promise();
};

export const awsMediaUpload = (req: Request, res: Response) => {

    console.log('Ok.')
    const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
        if (error) {
            console.log('Ahhhh')
            return res.status(501).send(error);
        };
        try {
            const path = files.file[0].path;
            const buffer : Buffer = fs.readFileSync(path);
            const type = await ftt.fromBuffer(buffer);
            const fileName = `${Date.now().toString()}`;
            const data = await uploadFile(buffer, fileName, type!);
            console.log('Yes !', data)
            return res.status(200).send(data);
        } catch (err) {
            console.log('Non...', err)
            return res.status(500).send(err);
        }
    });
};
