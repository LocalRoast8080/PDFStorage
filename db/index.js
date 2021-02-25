
const { Storage } = require("@google-cloud/storage");
const { remove } = require("fs-extra");

const bucketName = process.env.BK_NAME;
const filename = "./uploads/test.pdf";
const destination = "test.pdf";

const projectId = "aqueous-walker-304320";
const keyFilename = "gcloudKey.json";
const storage = new Storage({ projectId, keyFilename });

async function uploadFile(filePath, fileName) {
  const destination = fileName;
  const bucketName = process.env.BK_NAME;

  await storage.bucket(bucketName).upload(filePath, {
    destination: destination,
    metadata: {
      cacheControl: "public, max-age=31536000",
    },
  });

  console.log(`${destination} uploaded to ${bucketName}.`);
}

async function getAllFiles() {
  const bucketName = process.env.BK_NAME;
  const [files] = await storage.bucket(bucketName).getFiles();

  return files
}

module.exports = {  uploadFile, getAllFiles };
