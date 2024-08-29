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
    const task = await tasks.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await tasks.findByIdAndDelete(id);
    res.status(200).json({ message: "Task Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//get Users tasks
const getUsersTasks = async (req, res) => {
  try {
    const email = req.body.email || req.query.email;
    console.log("Email received:", email);
    const userTasks = await tasks.find({ email: email });
    console.log("Tasks found:", userTasks);
    if (userTasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }
    res.status(200).json(userTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Update task stats
const updateTaskState = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await tasks.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const updatedTask = await tasks.findByIdAndUpdate(id, req.body, {
      new: true,
    });
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
