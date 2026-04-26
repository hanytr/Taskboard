import './TaskItem.css';

function TaskItem({ task, onDelete }) {
  const getStatusBadge = (status) => {
    switch(status) {
      case 'todo': return { text: 'Todo', className: 'status-todo' };
      case 'in-progress': return { text: 'In Progress', className: 'status-progress' };
      case 'done': return { text: 'Done', className: 'status-done' };
      default: return { text: status, className: '' };
    }
  };
  const statusInfo = getStatusBadge(task.status);
  return (
    <div className="task-item">
      <div className="task-info">
        <span className="task-title">{task.title}</span>
        <span className={`status-badge ${statusInfo.className}`}>{statusInfo.text}</span>
      </div>
      <button className="delete-button" onClick={() => onDelete(task.id)}>🗑️ Xóa</button>
    </div>
  );
}

export default TaskItem;