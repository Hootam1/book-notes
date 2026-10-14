import express from "express";
import pg from "pg";
import axios from "axios";
import bodyParser from "body-parser";

const app=express();
const port=3000;
const PicAPI="https://covers.openlibrary.org/b/isbn/.jpg"//To get the picture

let books=[];
const db=new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"Books",
    password:"Lampdog0",
    port:5432
});

db.connect();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/",async (req,res)=>{
    const result= await db.query("SELECT * FROM books;");
    books=result.rows;
    res.render("index.ejs",{
        books:books
    });
});
app.get("/admin", (req, res) => {
  res.render("admin.ejs");
});

app.post("/add", async (req, res) => {
  const isbn = req.body.isbn;
  const notes = req.body.notes;
  const response = await axios.get(
    `https://openlibrary.org/search.json?isbn=${isbn}`
  );

   const book = response.data.docs[0];

  const title = book.title;
  const author = book.author_name[0];
  const cover_id = book.cover_i;

  await db.query("INSERT INTO books (title,author,isbn,notes,cover_id) VALUES($1,$2,$3,$4,$5)",[title,author,isbn,notes,cover_id]);
    
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
