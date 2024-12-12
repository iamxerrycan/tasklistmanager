import React from 'react';

const FilterDropdown = ({ tasks, setFilteredTasks }) => {
  const handleFilterChange = (status) => {
    if (status === 'All') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter((task) => task.status === status));
    }
  };

  return (
    <select
      className="border p-2"
      onChange={(e) => handleFilterChange(e.target.value)}
    >
      <option value="All">All</option>
      <option value="To Do">To Do</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </select>
  );
};

export default FilterDropdown;