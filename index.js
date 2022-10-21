const express = require("express");
const app = express();
const cors = require('cors')
const pool = require("./db");

app.use(express.json());
app.use(cors())

app.post("/api/v1/newOrder", async(req, res) =>{
    try{
        console.log(req.body)
        console.log(typeof(req.body))
        const {task, type, input_json, priority, done, updated, key_id, account_id, portfolio_id, exchange_id} = req.body;
        const query = `insert into tradingplatform.jobs(task, type, input_json, priority, done, updated, key_id, account_id, portfolio_id, exchange_id
            )values('${task}', '${type}', '${input_json}', '${priority}', '${done}', '${updated}', '${key_id}', '${account_id}', '${portfolio_id}', '${exchange_id}')returning *;`;
        const newTask = await pool.query(query)
        res.json(newTask)

    }catch(err){
        console.log(err)
    }
})


app.listen(3030, ()=>{
    console.log("sever on")
})