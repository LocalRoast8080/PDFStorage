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

module.exports = {deleteFile};

