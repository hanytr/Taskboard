import { useState } from 'react';
import './App.css';

const initialTasks = [
  { id: '1', title: 'Hany learn React', status: 'todo' },
  { id: '2', title: 'Hany build Todo App', status: 'in-progress' },
  { id: '3', title: 'Hany review PR', status: 'done' },
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
      setError('Vui lòng nhập tên công việc');
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

  // Xóa task
  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Lọc tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = searchQuery.trim() === '' ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Helper lấy badge màu
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

        {/* Form thêm task */}
        <div className="form-group">
          <input
            type="text"
            className="input-text"
            placeholder="Nhập tên công việc..."
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
          <button className="btn-add" onClick={handleAdd}>+ Thêm</button>
        </div>
        {error && <p className="error-msg">{error}</p>}

        {/* Thanh tìm kiếm và lọc */}
        <div className="filter-group">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Tìm kiếm công việc..."
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
            <p>✨ Không có công việc nào ✨</p>
            <p className="empty-hint">Hãy thêm công việc mới nhé!</p>
          </div>
        ) : (
          <>
            <div className="task-count">{filteredTasks.length} công việc</div>
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
                      🗑️ Xóa
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