const fs = require("fs");

const dbData = require("./src/temp.json");

module.exports = {
  createNewFile: (fileName) => {
    const isExists = fs.existsSync(fileName);
    if (!isExists) {
      const fd = fs.openSync(fileName, "w");
      let emtpyArray = [];
      fs.writeFile(
        fileName,
        JSON.stringify(emtpyArray),
        "utf-8",
        (err, data) => {
          if (err) throw err;
          console.log(`Saved to file ${fileName}`);
        }
      );
    } else {
      return null;
    }
  },
  saveJsonObjectToFile: (obj, fileName) => {
    dbData.push(obj.data);
    fs.writeFile(fileName, JSON.stringify(dbData), "utf-8", (err, data) => {
      if (err) throw err;
      console.log(`Saved to file ${fileName}`);
    });
  },
  readJsonObjectFromFile: (fileName) => {
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      let jsonObject = JSON.parse(data);
      console.log(jsonObject);
    });
  },
  deleteJsonObjectFromFile: (idx,fileName) => {
    dbData.splice(idx, 1);
    fs.writeFile(fileName, JSON.stringify(dbData), "utf-8", (err, data) => {
      if (err) throw err;
      console.log(`Saved to file ${fileName}`);
    });
  },

  updateJsonObjectFromFile: (idx,data,fileName) => {
      dbData.splice(idx,1,data);
      fs.writeFile(fileName, JSON.stringify(dbData), "utf-8", (err, data) => {
        if (err) throw err;
        console.log(`Saved to file ${fileName}`);
      });
      
  }
};
