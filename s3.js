//require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY


const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
// function uploadFile(file,path,filename) {
//   const fileStream = fs.createReadStream(path)

//   const uploadParams = {
//     Bucket: bucketName,
//     Body: fileStream,
//     Key: filename
//   }

//   return s3.upload(uploadParams).promise()
// }

function uploadFile (file, path, filename) {
  console.log('called uploadFile');
  const fileStream = fs.createReadStream(path)
  const localPath = `./data/${filename}` // specify the path where you want to save the file locally
  const writeStream = fs.createWriteStream(localPath) // create a writable stream to save the file locally

  return new Promise((resolve, reject) => {
    fileStream.pipe(writeStream) // pipe the file stream to the write stream to save the file locally
    fileStream.on('error', (error) => {
      reject(error)
    })
    writeStream.on('finish', () => {
      resolve({ Location: localPath }) // return the local file path as a Location object
    })
    writeStream.on('error', (error) => {
      reject(error)
    })
  })
}

exports.uploadFile = uploadFile