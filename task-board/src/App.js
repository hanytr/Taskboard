import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import './App.css';

const initialTasks = [
  { id: '1', title: 'Hany learn React', status: 'todo' },
  { id: '2', title: 'Hany Build Todo App', status: 'in-progress' },
  { id: '3', title: 'Hany Review PR', status: 'done' },
  { id: '4', title: 'Hany Pls take a rest', status: 'todo'},
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Adding new tasks
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  // Delete tasks
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Filter tasks based on searching and status
  const filteredTasks = tasks.filter(task => {
    // Based on search (title contains, Uppercase or Lowercase is acceptable)
    const matchesSearch = searchQuery.trim() === '' || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase());
    // Based on status
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