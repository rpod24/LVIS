const http = require("http");
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const port = 4000;
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/";

app.use(express.static(path.join(__dirname, "public")));

//validate the account with a token via a mongodb 
const validateAccount = (token) => {
  return true;
  // MongoClient.connect(url, function (err, db) {
  //   if (err) throw err;
  //   var dbo = db.db("mydb");
  //   var query = { token: token };
  //   dbo.collection("customers").find(query).toArray(function (err, result) {
  //     if (err) throw err;
  //     console.log(result);
  //     db.close();
  //   });
  // });
}

app.get("/", (req, res) => {
  if(validateAccount(req.query.token)){
    res.writeHead(200, { "Content-Type": "text/html" });
    res.sendFile(path.join(__dirname, "public", "index.html"));
  }
});

app.post("/upload", (req, res) => {
  const file = req.files.file;
  const fileName = file.name;
  const fileLocation = path.join(__dirname, "public", fileName);
  file.mv(fileLocation, (err) => {
    if (err) {
      console.error(err);
      res.writeHead(500, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ status: "error", message: err }));
      return;
    }
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ status: "success", path: fileLocation }));
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
