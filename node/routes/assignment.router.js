const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignment.controller');
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');


router.post('/add', assignmentController.createAssignment);
router.get('/getAll', assignmentController.getAssignments);


module.exports = router;
