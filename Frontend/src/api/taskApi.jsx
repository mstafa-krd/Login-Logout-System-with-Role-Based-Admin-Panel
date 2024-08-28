const mainApi = "http://localhost:4000/api/task";

const createTaskApi = `${mainApi}/create`;
const getAllTasksApi = `${mainApi}/tasks`;
const deleteTaskApi = `${mainApi}`;
const getUsersTasksApi = `${mainApi}/user-tasks`;
const updateTaskStateApi = `${mainApi}`;

export {
  createTaskApi,
  getAllTasksApi,
  deleteTaskApi,
  getUsersTasksApi,
  updateTaskStateApi,
};
