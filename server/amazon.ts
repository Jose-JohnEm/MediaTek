import fs from 'fs'
import AWS from 'aws-sdk'

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