const taskModel = require("../models/task.model");
const getTodayDate = require("../utils/dateFormater.js");

const today = getTodayDate();
exports.showTasks = async (req, res) => {
  const tasks = await taskModel.findAll({
    where: {
      date: today,
    },
  });
  res.render("index", { tasks: tasks });
};

exports.addTasks = async (req, res) => {
  const { date, name, description } = req.body;
  console.log(req.body);
  const current_highest_order = await taskModel.max("task_order", {
    where: {
      date: today,
    },
  });
  let order = 1;
  if (current_highest_order != null) {
    order = current_highest_order + 1;
  }
  const task = taskModel.create({
    task_order: order,
    task_name: name,
    description: description,
    finished: false,
    date: date,
  });
  res.redirect("/");
};

exports.deleteTask = async (req, res) => {
  const { task_order, date } = req.body;

  const ok = await taskModel.destroy({
    where: {
      task_order: task_order,
      date: date,
    },
  });
  if (ok) {
    res.status(200).send("task was deleted");
  } else {
    res.status(404).send("Not found");
  }
};

exports.checkTask = async (req, res) => {
    console.log(req.body);
    const { task_order, date, finished } = req.body;
    const tasks = await taskModel.update(
      {
        finished: (finished === 'true' ? true : false),
      },
      {
        where: {task_order,
          date: date,
        },
      },
    );
    if (tasks[0] > 0) {
      res.status(200).send("ok");
    } else {
      res.status(404).send("not ok from server");
    }
};

exports.updateTask = async (req, res) => {
  const {date, task_order, task_name, require} = req.body
  const task = await taskModel.update(
    {
      task_name: task_name,
      description: require
    }, 
    {
      where: {
        date: date,
        task_order: task_order
      }
    }
  )
  res.json(task[0])
}
