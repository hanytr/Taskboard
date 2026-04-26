import { useState } from 'react';
import './App.css';

const initialTasks = [
  { id: '1', title: 'Learn Python in 3 hours/ Javscript from F8', status: 'todo' },
  { id: '2', title: 'Build Todo App', status: 'in-progress' },
  { id: '3', title: 'Review work', status: 'done' },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newTitle, setNewTitle] = useState('');
  const [newStatus, setNewStatus] = useState('todo');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (newTitle.trim() === '') {
      setError('Type your tasks');
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      status: newStatus
    };
    setTasks([...tasks, newTask]);
    setNewTitle('');
    setNewStatus('todo');
    setError('');
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };


  const filteredTasks = tasks.filter(task => {
    const matchesSearch = searchQuery.trim() === '' ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });


  const getStatusBadge = (status) => {
    switch(status) {
      case 'todo': return { text: 'Todo', className: 'badge-todo' };
      case 'in-progress': return { text: 'In Progress', className: 'badge-progress' };
      case 'done': return { text: 'Done', className: 'badge-done' };
      default: return { text: status, className: '' };
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Hany Todo List</h1>

        {}
        <div className="form-group">
          <input
            type="text"
            className="input-text"
            placeholder="Type your tasks..."
            value={newTitle}
            onChange={(e) => { setNewTitle(e.target.value); if (error) setError(''); }}
          />
          <select
            className="select-status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button className="btn-add" onClick={handleAdd}>+ Add</button>
        </div>
        {error && <p className="error-msg">{error}</p>}

        {}
        <div className="filter-group">
          <input
            type="text"
            className="search-input"
            placeholder= "Search the tasks"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tất cả</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        {/* Danh sách công việc */}
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <p>✨ There don't have any tasks ✨</p>
            <p className="empty-hint">Pls add more tasks!</p>
          </div>
        ) : (
          <>
            <div className="task-count">{filteredTasks.length} tasks</div>
            <div className="task-list">
              {filteredTasks.map(task => {
                const badge = getStatusBadge(task.status);
                return (
                  <div key={task.id} className="task-item">
                    <div className="task-info">
                      <span className="task-title">{task.title}</span>
                      <span className={`badge ${badge.className}`}>{badge.text}</span>
                    </div>
                    <button className="btn-delete" onClick={() => handleDelete(task.id)}>
                      🗑️ Delete
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;