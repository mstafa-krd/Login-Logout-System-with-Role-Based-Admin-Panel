const tasks = require("../models/tasks");

//add a task
const createTask = async (req, res) => {
  const { name, email, discrption, stats, manager } = req.body;
  try {
    await tasks.create({ name, email, discrption, stats, manager }).then(() => {
      res.send("Task made successfully");
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//get all the tasks
const getAllTasks = async (req, res) => {
  try {
    const myTasks = await tasks.find({});
    res.json(myTasks);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//Delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await tasks.findByIdAndDelete(id);
    res.status(200).json({ message: "Task Deleted successfully " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get Users tasks
const getUsersTasks = async (req, res) => {
  try {
    const { email } = req.body;
    const userTasks = await tasks.find({email:email});
    res.status(200).json(userTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update task stats
const updateTaskState = async (req, res) => {
  try {
    const { id } = req.params;
    const mytask = await tasks.findByIdAndUpdate(id, req.body);
    if (!mytask) {
      res.status(404).json({ message: "Task  not found " });
    }

    const updatedTask = await tasks.findById(id);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createTask,
  getAllTasks,
  deleteTask,
  getUsersTasks,
  updateTaskState,
};
