import express from "express";
import cors from "cors";
import mysql from 'mysql'

let con = mysql.createConnection({
    host: "localhost",
    user: 'alfserver',
    password: 'ma599097'
})

con.connect(function(err){
    if (err) throw err;
    console.log("Connected")
})

const app = express()
const PORT = 2003

app.use(cors());
app.use(express.json());



app.get("/services/getData", (req,res) => {
    res.json({msg: "Hello"})
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});