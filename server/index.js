import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Your Own DB password",
  database: "test",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello there! welcome to my express js server zehaha");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(data);
    }
  });
});

app.post("/books", (req, res) => {
  const q =
    "INSERT INTO books(`title`, `description`, `price`, `cover`) VALUES (?,?,?,?)";

  const VALUES = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, VALUES, (err, queryresult) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("Books added successfully......");
    }
  });
});

app.delete("/books:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, queryresult) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json("Book has been deleted successfully.");
    }
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title`=?, `description`=?, `price`=?, `cover`=? WHERE id=?";

  const VALUES = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
    bookId, // This should be the last value in the array to match the WHERE condition
  ];

  db.query(q, VALUES, (err, queryresult) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.json("Book has been updated successfully.");
    }
  });
});

app.listen(5000, () => {
  console.log("Server  is  listening on port 5000.........");
});
