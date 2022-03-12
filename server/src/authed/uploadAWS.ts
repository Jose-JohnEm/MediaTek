import AWS from 'aws-sdk'
import multiparty from 'multiparty'
const fileTypeFromBuffer = require('file-type')

// (async () => {
//     const {default: fType} = import('file-type')
//     fileType.default()
//     import('file-type').then(mod => fileType = mod.default());
// })()

import fs from 'fs'
import { Request, Response } from 'express'

const s3Config = {
    bucketName:  process.env.AWS_BUCKET_NAME,
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY,
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

export const awsUpload = (req: Request, res: Response) => {
    const form = new multiparty.Form();
    form.parse(req as any, async (error, fields, files) => {
        if (error) {
            return (res as any).status(500).send(error);
        };
        try {
            const path = files.file[0].path;
            const buffer : Buffer = fs.readFileSync(path);
            const type = await fileTypeFromBuffer(buffer);
            const fileName = `bucketFolder/${Date.now().toString()}`;
            const data = await uploadFile(buffer, fileName, type!);
            return res.status(200).send(data);
        } catch (err) {
            return res.status(500).send(err);
        }
    });
};
