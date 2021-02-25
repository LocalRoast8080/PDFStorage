const knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    port: 3306,
  },
});

const testCon = function () {
  knex
    .select()
    .table("file_paths")
    .then(function (rows) {
      rows.forEach((row) => console.log(row.file_id));
    })
    .catch(function (error) {
      console.error(error);
    });
};

const bucketName = process.env.BK_NAME;
const filename = "./uploads/test.pdf";
const destination = "test.pdf";

const { Storage } = require("@google-cloud/storage");


async function uploadFile(filePath, fileName) {
  const destination = fileName;
  const bucketName = process.env.BK_NAME;
  const projectId = "aqueous-walker-304320";
  const keyFilename = "gcloudKey.json";
  const storage = new Storage({ projectId, keyFilename });

  await storage.bucket(bucketName).upload(filePath, {
    destination: destination,
    metadata: {
      cacheControl: "public, max-age=31536000",
    },
  });

  console.log(`${destination} uploaded to ${bucketName}.`);
}

async function downloadFile() {
  const projectId = "aqueous-walker-304320";
  const keyFilename = "gcloudKey.json";
  const storage = new Storage({ projectId, keyFilename });
  const srcFilename = "test.pdf";
  const destFilename = "./uploads/test.pdf";
  const options = {
    // The path to which the file should be downloaded, e.g. "./file.txt"
    destination: destFilename,
  };

  // Downloads the file
  await storage.bucket(bucketName).file(srcFilename).download(options);

  console.log(
    `gs://${bucketName}/${srcFilename} downloaded to ${destFilename}.`
  );
}

module.exports = { knex, testCon ,uploadFile};
