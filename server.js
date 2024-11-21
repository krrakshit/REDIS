const express = require('express')
const axios = require('axios')
const client = require('./client')
const app = express()

app.get('/', async(req,res)=>{
const chachevalue = await client.get('todos')

if(chachevalue) return res.json(JSON.parse(chachevalue))
    const {data} = await axios.get('https://jsonplaceholder.typicode.com/todos')
    await client.set('todos',JSON.stringify(data))
     await client.expire('todos',30)

return res.json(data)

})

app.listen(9000)