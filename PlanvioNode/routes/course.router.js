const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');


router.post('/add', courseController.createCourse);
router.get('/getAll', courseController.getCourses);


module.exports = router;
