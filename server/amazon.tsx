import AWS from 'aws-sdk'
import React, { useRef } from 'react'

const s3 = new AWS.S3({
  accessKeyId: 'AKIAX4ONKWV5SADDP7LI',
  secretAccessKey: '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',
  signatureVersion: 'v4',
  region: 'eu-west-3',
})

const mediaSupported : { [keys: string]: string[] } = {
  'music': ['mp3', 'wma', 'ogg', 'aac'],
  'video': ['mp4'],
  'photo': ['jpg', 'jpeg', 'png', 'svg', 'gif'],
  'book': ['pdf']
}

export function Upload() {
  const fileInput = useRef();

  const handleClick = event => {
    event.preventDefault();
    console.log(fileInput.current)
  }
  return (
    <>

    </>
  )
}

export const uploadFile = async (fileName: string, category: string) => {
  const fileContent = fs.readFileSync(fileName)
  const ext = fileName.split('.')[-1]

  if (!mediaSupported[category].some(a => a == ext)) {
    throw ext + ' pour la catégorie ' + category + ' n\'est pas supporté'
  }

  const src_file = Date.now().toString() + '.' + ext

  const params : AWS.S3.PutObjectRequest = {
    Bucket: 'mediatek-media-files',
    Key: src_file,
    Body: fileContent
  }

  s3.upload(params, function(err, data) {
    if (err) {
      throw err;
    } else {
      return src_file
    }
  });
}

export async function getMedia(src: string) {
  const data = await s3.getSignedUrlPromise('getObject', {
    Bucket: process.env.AWS_BUCKET as string,
    Key: src,
  })

  console.log(data);
  return data;
}