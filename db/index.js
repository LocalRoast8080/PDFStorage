const { Storage } = require("@google-cloud/storage");
const fs = require("fs-extra");

const bucketName = process.env.BK_NAME;

const projectId = "aqueous-walker-304320";
const keyFilename = "gcloudKey.json";
const storage = new Storage({ projectId, keyFilename });

async function uploadFile(filePath, fileName) {
  const destination = fileName;

  await storage.bucket(bucketName).upload(filePath, {
    destination: destination,
    metadata: {
      cacheControl: "public, max-age=31536000",
    },
  });

  console.log(`${destination} uploaded to ${bucketName}.`);
}

async function uploadMultifiles(fileArray) {
  for (const file of fileArray) {
    const destination = file.filename;
    const filePath = file.path;

    await storage.bucket(bucketName).upload(filePath, {
      destination: destination,
      metadata: {
        cacheControl: "public, max-age=31536000",
      },
    });
    console.log(`${destination} uploaded to ${bucketName}.`);
  }
}

async function getAllFiles() {
  const [files] = await storage.bucket(bucketName).getFiles();

  return files;
}

async function downloadFile(fileName) {
  const options = {
    destination: `uploads/${fileName}`,
  };

  await storage.bucket(bucketName).file(fileName).download(options);

  console.log(`gs://${bucketName}/${fileName} downloaded to /uploads`);
}

async function deleteFile(fileObject) {
  await storage.bucket(bucketName).file(fileObject.filename).delete();

  console.log(`gs://${bucketName}/${fileObject.filename} deleted.`);

  deleteFile().catch(console.error);
}

module.exports = {
  uploadFile,
  getAllFiles,
  downloadFile,
  uploadMultifiles,
  deleteFile,
};
