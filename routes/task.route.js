const express = require('express')
const { addTasks, showTasks, deleteTask, checkTask, updateTask } = require('../controllers/task.controller')
const router = express.Router()

router.get('/', showTasks)
router.post('/', addTasks)
router.post('/check', checkTask)
router.post('/update', updateTask)
router.delete('/', deleteTask)

module.exports = router