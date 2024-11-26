const express = require("express");
const logger = require("morgan");

const data = [
  {
    _id: 0,
    name: "John Doe",
    age: 30,
  },
  {
    _id: 1,
    name: "Jane Smith",
    age: 25,
  },
];

const app = express();

app.use(logger("dev"));
app.use((req, res, next) => {
  console.log("THIS RUNS ON EACH REQUEST");
  const isAdmin = true;
  if (isAdmin) {
    next();
  } else {
    res.status(401).send("You are not authorized");
  }
});
app.use(express.json());

app.get("/", (req, res) => {
  res.json("This is the home route");
});

app.get("/users", (req, res) => {
  console.log("REQUEST QUERY: ", req.query.age);

  const response = data.find((user) => user.age == req.query.age);

  res.json(response);
});

app.post("/users", (req, res) => {
  console.log(req.body);
  console.log("We are going to create the user");
  // your code goes here
  res.status(201).send("user created");
});

app.get("/documentation", (req, res) => {
  res.sendFile(__dirname + "/views/documentation.html");
});

app.get("/users/:userId", (req, res) => {
  console.log("req.params -> ", req.params);

  const response = data.find((user) => user._id == req.params.userId);

  if (response) {
    res.status(302).send(response);
  } else {
    res.status(404).send("User not found");
  }
});

app.listen(5050, () => {
  console.log("Server running 🏃‍♀️on http://localhost:5050");
});
