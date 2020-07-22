const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = 8000;
mongoose.connect(
  "mongodb+srv://dinhngoc:ngoc123456@cluster0-vm6ph.mongodb.net/test?retryWrites=true&w=majority"
);

const User = require("./models/User");
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`server is listening on port:${port}`);
});

function sendNotion(res, err, data) {
  if (err) {
    res.json({ success: false, message: err });
  } else if (!data) {
    res.json({ success: false, message: "Not Found" });
  } else {
    res.json({ success: true, data: data });
  }
}
// CREATE
app.post("/users", (req, res) => {
  User.create(
    {
      ...req.body.newData,
    },
    (err, data) => {
      sendNotion(res, err, data);
    }
  );
});

app
  .route("/users/:id")
  // READ
  .get((req, res) => {
    User.findById(req.params.id, (err, data) => {
      sendNotion(res, err, data);
    });
  })
  //UPDATE
  .put((req, res) => {
    User.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body.newData,
      },
      {
        new: false,
      },
      (err, data) => {
        sendNotion(res, err, data);
      }
    );
  })
  // DELETE
  .delete((req, res) => {
    User.findByIdAndDelete(req.params.id, (err, data) => {
      sendNotion(res, err, data);
    });
  });
