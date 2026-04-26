import { useState } from 'react';
import './TaskForm.css';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('todo');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') {
      setError('Type the tasks');
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      status: status
    };
    onAddTask(newTask);
    setTitle('');
    setStatus('todo');
    setError('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="form-input"
          placeholder="Type the tasks..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
        />
        <select 
          className="form-select" 
          value={status} 
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button type="submit" className="form-button">+ Thêm</button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default TaskForm;