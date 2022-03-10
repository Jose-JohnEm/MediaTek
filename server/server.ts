import express, {Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import auth from './src/authed/authenticator'
import AWS from 'aws-sdk'
import fs from 'fs'

dotenv.config()


const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS,
  secretAccessKey: process.env.AWS_SECRET,
  signatureVersion: 'v4',
  region: 'eu-west-3'
})

const uploadFile = (fileName: string) => {
  const fileContent = fs.readFileSync(fileName)

  const params : AWS.S3.PutObjectRequest = {
    Bucket: process.env.AWS_BUCKET as string,
    Key: fileName,
    Body: fileContent
  }

  s3.upload(params, function(err, data) {
    if (err) {
        throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
}

async function getMedia() {
  const data = await s3.getSignedUrlPromise('getObject', {
    Bucket: process.env.AWS_BUCKET as string,
    Key: 'mtk.png'
  })

  console.log(data);
  
  return data;
}

getMedia()

// uploadFile('mtk.png')

// const app = express();

// const PORT = process.env.PORT;

// app.use((req: express.Request, res: express.Response, next: NextFunction) => {
//     console.log(req.url)
//     next()
// })

// app.use('/auth', auth)

// app.get('/', (req: Request, res: Response) => {

//     res.status(200).json({"message": "mes couilles sur ton front" })
// })

// app.listen(PORT, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
// });