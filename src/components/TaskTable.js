import React, { useState } from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator.min.css';
import '../index.css';

const TaskTable = ({ tasks, showToast, setTasks }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [currentStatus, setCurrentStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCellEdited = (cell) => {
    const updatedTask = cell.getData();
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
    showToast('Task Updated Successfully!', 'success');
  };

  const handleDelete = (cell) => {
    const taskId = cell.getData().id;
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    showToast('Task Deleted Successfully!', 'error');
  };

  const openStatusPopup = (taskId, currentStatus) => {
    setCurrentTaskId(taskId);
    setCurrentStatus(currentStatus);
    setPopupOpen(true);
  };

  const handleStatusChange = (newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === currentTaskId ? { ...task, status: newStatus } : task
      )
    );
    setPopupOpen(false);
    showToast('Task Status Updated Successfully!', 'success');
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return (
      task.title.toLowerCase().includes(lowercasedQuery) ||
      task.description.toLowerCase().includes(lowercasedQuery)
    );
  });

  const columns = [
    { title: 'ID', field: 'id', hozAlign: 'center', width: 50 },
    {
      title: 'Title',
      field: 'title',
      editor: 'input',
      headerSort: false,
    },
    {
      title: 'Description',
      field: 'description',
      editor: 'input',
      headerSort: false,
    },
    {
      title: 'Status',
      field: 'status',
      headerSort: false,
      formatter: (cell) => {
        return `<button class="edit-btn">${cell.getValue()}</button>`;
      },
      cellClick: (e, cell) => {
        openStatusPopup(cell.getData().id, cell.getValue());
      },
    },
    {
      title: 'Actions',
      field: 'delete',
      width: 100,
      hozAlign: 'center',
      headerSort: false,
      formatter: () => '<button class="delete-btn">Delete</button>',
      cellClick: (e, cell) => handleDelete(cell),
    },
  ];

  const options = {
    layout: 'fitColumns',
    movableColumns: true,
    height: 'auto',
  };

  return (
    <div className="mt-4">
      <div className="search-bar ">
        <input
          type="text"
          className="rounded-xl-custom"
          placeholder="Search by Title or Description"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <ReactTabulator
        data={filteredTasks}
        columns={columns}
        options={options}
        className="tabulator"
        cellEdited={handleCellEdited}
      />

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Edit Task Status</h2>
            <select
              value={currentStatus}
              onChange={(e) => setCurrentStatus(e.target.value)}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <div className="popup-buttons">
              <button onClick={() => setPopupOpen(false)}>Cancel</button>
              <button onClick={() => handleStatusChange(currentStatus)}>
                Change
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskTable;
