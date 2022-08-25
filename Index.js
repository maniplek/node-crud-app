const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
    const { error}=  validateCourse(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("course id requested not found");
  res.status(200).send(course);
});

app.put('/api/courses/:id', (req,res)=>{
    const course = courses.find((c)=> c.id === parseInt(req.params.id));
    if(!course) res.status(404).sendStatus('course not available..')

    const { error}=  validateCourse(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
     
    course.name = req.body.name;
    res.send(course);
    

})

function validateCourse(course){
    const schema = {
        name: Joi.string().alphanum().min(3).max(10).required(),
      };
    
      return Joi.validate(course, schema);
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`running on port ${port}`));
