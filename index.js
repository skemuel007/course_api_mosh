const Joi = require('joi');
const express = require('express');
const { send } = require('express/lib/response');
const app = express();

app.use(express.json())

const courses = [
    { id: 1, name: 'Course 1'},
    { id: 2, name: 'Course 2'},
    { id: 3, name: 'Course 3'}
];

app.get('/',(req, res) => {
    return res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    return res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course)
        return res.status(404).send('The course with the given Id was not found');
    return res.send(course);
});

app.post('/api/courses', (req, res) => {

    // step 1 define a schema
    const { error } = validateCourse(req.body); // same as result.error
    if ( error ) {
        return res.status(400).send(error.details[0].message);
    }

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
});

app.put('/api/courses/:id', (req, res) => {

    const { error } = validateCourse(req.body); // same as result.error
    if ( error ) {
        return res.status(400).send(error.details[0].message);
    }

    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course)
        return res.status(404).send('Course not found');

    course.name = req.body.name;

    return res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    // validate course exists
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course)
        return res.status(404).send('Course not found');

    // delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    return res.send(course);
})

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
};

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`Server is running on ${port}`) );