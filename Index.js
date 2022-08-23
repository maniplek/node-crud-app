const { request } = require('express');
const express = require('express');
const app = express();

app.get('/', (req,res)=>{
    res.send('hello world')
})

app.get('/api/courses', (req,res)=>{
    res.send([1,2,3,4,5])
});

app.get('/api/courses/:id', (req,res)=>{
    res.send(req.params);
})
//for reading query parameter
app.get('/api/post/:year/:month', (req,res)=>{
    res.send(req.query);
})

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`running on port ${port}`));