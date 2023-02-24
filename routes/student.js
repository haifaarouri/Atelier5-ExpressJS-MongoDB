const express = require('express')
const router = express.Router()
const studentService = require('../services/student')

router.get('/', studentService.getAllStudents)

router.get('/noteName', studentService.getByNoteSortedByName)

router.post('/addStudent', studentService.addStudent)

router.get('/:id', studentService.getByID)

router.get('/findByName/:name', studentService.getByName)

// router.put('/:id', studentService.updateStudent)

router.put('/updateNote', studentService.updateNote)

router.delete('/:id', studentService.deleteStudent)

module.exports = router