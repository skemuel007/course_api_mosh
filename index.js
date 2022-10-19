const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json())

const courses = [
    { id: 1, name: 'Course 1'},
    { id: 2, name: 'Course 2'},
    { id: 2, name: 'Course 3'}
];

app.get('/',(req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course)
        res.status(404).send('The course with the given Id was not found');
    res.send(course);
});

app.post('/api/courses', (req, res) => {

    // step 1 define a schema
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.ValidationError(req.body, schema);

    // console.log(result);
    /*if (!req.body.name || req.body.name.length < 3) {
        return res.status(400).send('Name is required and should be a minimum of 3 chars');
    }*/
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    return res.status(200).send(course);
})

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`Server is running on ${port}`) );