import express, { json } from "express";
import cors from "cors";
import mysql from 'mysql'

let con = mysql.createConnection({
    host: "localhost",
    user: 'alfserver',
    password: 'ma599097',
    database: 'alfserver'
})

const app = express()
const PORT = 2003

app.use(cors());
app.use(express.json());

con.connect(function(err){
    if (err) throw err;
})

app.post("/getUserData", (req,res) => {
    const data = req.body;
    con.query("SELECT spriteData FROM sootsprite WHERE UUID = ?", [data.uuid], (err, result) => {
        if (err) throw err;
        if (result.length === 0){
            return res.status(404).json({msg: "User Not Found!", state:false})
        }
        res.json(JSON.parse(result[0].spriteData))
    })
})

app.post("/saveUserData", (req,res) => {
    const data = req.body;
    con.query("SELECT uuid FROM sootsprite WHERE UUID = ?", [data.uuid], (err, result) => {
        if (err) throw err;
        if (result.length === 0){
            con.query("INSERT INTO sootsprite (UUID) VALUES (?)", [data.uuid], (err, result) => {
                if (err) throw err;
                return res.json({msg: "All Good!"});
            })
        }else{
            con.query("UPDATE sootsprite SET spriteData = ? WHERE UUID = ?", [JSON.stringify(data.spriteData), data.uuid], (err, result) => {
                if (err) throw err;
                return res.json({msg: "All Good!"})
            })
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});