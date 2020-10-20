const express = require("express");
const fileManager = require("./fileManager");
const app = express();

const fileName = __dirname + "/src/temp.json";

const port = 8000;

const cors = require("cors");
const bodyParser = require("body-parser");
const dbData = require("./src/temp.json");

app.use(cors());
app.use(bodyParser());

app.get("/", (req, res) => {
  res.send(dbData);
  fileManager.createNewFile(fileName);
});

app.post("/send", (req, res) => {
  const data = req.body;
  fileManager.saveJsonObjectToFile(data, fileName);
  res.status(200).json(dbData.data);
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  fileManager.deleteJsonObjectFromFile(id, fileName);
  res.send("deleted success");
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const updatedData = req.body.updateData;
  fileManager.updateJsonObjectFromFile(id, updatedData, fileName);
  res.send("update success", id, updatedData);
});

app.get("/data", (req, res) => {
  let m = fileManager.readJsonObjectFromFile(fileName);
  res.status(200).json({
    data: dbData,
  });
});

app.get("/read", (req, res) => {
  let k = fileManager.readJsonObjectFromFile(fileName);
  res.status(200).send(k);
});

app.listen(port, () => {
  console.log("App is running on" + port);
});
