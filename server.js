const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const port = 8000;
mongoose.connect(
  "mongodb+srv://dinhngoc:ngoc123456@cluster0-vm6ph.mongodb.net/test?retryWrites=true&w=majority"
);
const User = require("./models/User");
const app = express();
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`server is listening on port:${port}`);
});

// CREATE
app.post("/users", (req, res) => {
  User.create(
    {
      name: req.body.newData.name,
      email: req.body.newData.email,
      password: req.body.newData.password,
    },
    (err, data) => {
      if (err) {
        res.json({ success: false, message: err });
      } else if (!data) {
        res.json({ success: false, message: "Not Found" });
      } else {
        res.json({ success: true, data: data });
      }
    }
  );
});

app
  .route("/users/:id")
  // READ
  .get((req, res) => {
    User.findById(req.params.id, (err, data) => {
      if (err) {
        res.json({
          success: false,
          message: err,
        });
      } else if (!data) {
        res.json({
          success: false,
          message: "Not found",
        });
      } else {
        res.json({
          success: true,
          message: data,
        });
      }
    });
  })
  //UPDATE
  .put((req, res) => {
    User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.newData.name,
        email: req.body.newData.email,
        password: req.body.newData.password,
      },
      {
        new: false,
      },
      (err, data) => {
        if (err) {
          res.json({
            success: false,
            message: err,
          });
        } else if (!data) {
          res.json({
            success: false,
            message: "Not Found",
          });
        } else {
          res.json({
            success: true,
            data: data,
          });
        }
      }
    );
  })
  // DELETE
  .delete((req, res) => {
    // User.findByIdAndDelete()
  });
