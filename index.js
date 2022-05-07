const express = require("express");
const port = 8000;
const path = require("path");
const db = require("./config/mongoose");
const Contact = require("./models/contact");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));
// //middleware 1
// app.use(function (req, rex, next) {
//   req.myName = "aa";
//   next();
// });
// //middleware 2
// app.use(function (req, rex, next) {
//   console.log("my name", req.myName);
//   next();
// });
var contactList = [
  { name: "a", phone: "1111111111" },
  {
    name: "b",
    phone: "2222222222",
  },
  {
    name: "c",
    phone: "3333333333",
  },
];

app.get("/", function (req, res) {
  // console.log("from get route controller", req.myName);
  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log("error in fetching contact from db");
      return;
    }

    return res.render("home", {
      title: "Contacts List",
      contact_list: contacts,
    });
  });
});
app.post("/create-contact", function (req, res) {
  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    function (err, newContact) {
      if (err) {
        console.log("error in creating a contact!");
        return;
      }
      console.log("*******", newContact);

      return res.redirect("back");
    }
  );
});
app.get("/delete-contact/", function (req, res) {
  //get id from query
  let id = req.query.id;
  //now delete the contact based on id
  Contact.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("error in deleting from database");
      return;
    }
    return res.redirect("back");
  });
});

// app.get("/practice", function (req, res) {
//   return res.render("practice", {
//     title: "letplayejs",
//   });
// });

app.listen(port, function (err) {
  if (err) {
    console.log("error in server");
  }
  console.log("server running");
});
