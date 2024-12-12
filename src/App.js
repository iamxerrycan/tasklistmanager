import './index.css';
import { useEffect, useState } from 'react';
import TaskTable from './components/TaskTable';
import AddTask from './components/AddTask';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch initial data
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then((data) => {
        const formattedTasks = data.slice(0, 20).map((task) => ({
          id: task.id,
          title: task.title,
          description: task.description || 'No description provided', // api not providing description !!!!!!
          status: task.completed ? 'Done' : 'To Do',
        }));
        setTasks(formattedTasks);
      });
  }, []);

  const taskCounts = tasks.reduce(
    (counts, task) => {
      counts[task.status] = (counts[task.status] || 0) + 1;
      return counts;
    },
    { 'To Do': 0, 'In Progress': 0, Done: 0 } 
  );
  

  const showToast = (message, type) => {
    toast[type](message ,{position: "top-center"});
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4 flex-row">
        <h1 className="text-2xl font-bold">Task List Manager</h1>
        <div className="flex space-x-4 text-sm">
          <span className="text-blue-500 text-2xl font-bold ">To Do: {taskCounts['To Do']}</span>
          <span className="text-yellow-500 text-2xl font-bold ">In Progress: {taskCounts['In Progress']}</span>
          <span className="text-green-500 text-2xl font-bold">Done: {taskCounts['Done']}</span>
        </div>
      </div>
      <AddTask setTasks={setTasks} tasks={tasks} showToast={showToast}/>
      <TaskTable tasks={tasks} setTasks={setTasks} showToast={showToast}/>
      <ToastContainer />
    </div>
  );
};

export default App;