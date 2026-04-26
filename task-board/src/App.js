import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
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

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = searchQuery.trim() === '' || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Hany Todo List</h1>
        <TaskForm onAddTask={addTask} />
        <TaskFilter 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        <TaskList tasks={filteredTasks} onDeleteTask={deleteTask} />
      </div>
    </div>
  );
}

export default App;