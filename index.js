import express from "express";
import pg from "pg";
import axios from "axios";

const app=express();
const port=3000;
const PicAPI="https://covers.openlibrary.org/b/isbn/.jpg"//To get the picture


app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/",(req,res)=>{
    res.render("index.ejs",{
        books:books
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const books = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    rating: 5,
    notes: "A practical book about building good habits and breaking bad ones.",
    isbn: "9780735211292"
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    rating: 5,
    notes: "Explains how people think about money and how behavior affects financial decisions.",
    isbn: "9780857197689"
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    rating: 4,
    notes: "A book about focusing deeply and producing valuable work in a distracted world.",
    isbn: "9781455586691"
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    rating: 5,
    notes: "A guide about writing readable, maintainable, and professional code.",
    isbn: "9780132350884"
  }
];
