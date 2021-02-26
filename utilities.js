const path = require('path')
const fs = require('fs-extra')


function deleteFile(fileName) {
    fs.remove(fileName)
      .then(() => {
        console.log(`${fileName} deleted`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

function deleteFiles(fileArray){
  fileArray.forEach(file => {
    const filePath = `./uploads/${file.filename}`
    fs.remove(filePath)
    .then(() => {
      console.log(`${filePath} deleted`);
    })
    .catch((err) => {
      console.log(err);
    });
  });
}

module.exports = {deleteFile, deleteFiles};

