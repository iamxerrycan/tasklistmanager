import React, { useState } from 'react';
import '../index.css'; 

const AddTaskForm = ({ setTasks, showToast }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'To Do',
  });
  const [errors, setErrors] = useState({ title: '', description: '' });

  const handleAddTask = () => {
    const newErrors = {};
    if (!newTask.title.trim()) {
      newErrors.title = 'Title is required.';
    }
    if (!newTask.description.trim()) {
      newErrors.description = 'Description is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => {
        setErrors({});
      }, 2000);
      return;
    }
    setTasks((prevTasks) => [...prevTasks, { ...newTask, id: Date.now() }]);
    showToast('Task Added Successfully!', 'success');
    setNewTask({ title: '', description: '', status: 'To Do' });
    setErrors({});
  };

  return (
    <div className="flex h-15 justify-around">
      {/* Title Input */}
      <div className="flex  flex-col relative">
        <input
          type="text"
          placeholder="Title"
          className={`border p-2 ${
            errors.title ? 'border-red-500' : ''
          } rounded-xl-custom`}
          value={newTask.title}
          onChange={(e) => {
            setNewTask({ ...newTask, title: e.target.value });
            setErrors({ ...errors, title: '' }); 
          }}
        />
        {errors.title && (
          <span className="text-red-500 text-xs absolute top-full ">
            {errors.title}
          </span>
        )}
      </div>

      {/* Description Input */}
      <div className="flex flex-col relative">
        <input
          type="text"
          placeholder="Description"
          className={`border p-2 ${
            errors.description ? 'border-red-500' : ''
          } rounded-xl-custom`}
          value={newTask.description}
          onChange={(e) => {
            setNewTask({ ...newTask, description: e.target.value });
            setErrors({ ...errors, description: '' }); 
          }}
        />
        {errors.description && (
          <span className="text-red-500 text-xs absolute top-full ">
            {errors.description}
          </span>
        )}
      </div>

      {/* Status Dropdown */}
      <select
        className="border p-2 rounded-xl-custom"
        value={newTask.status}
        onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
      >
        <option>To Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>

      {/* Add Task Button */}
      <button
        className="bg-blue-500 text-white p-2 rounded-xl-custom"
        onClick={handleAddTask}
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTaskForm;
