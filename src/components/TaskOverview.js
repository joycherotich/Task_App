import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RUBY_URL = 'http://localhost:3000/tasks';  

function TaskOverview() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(RUBY_URL);
      setTasks(res.data);
    } catch (err) {
      console.error(err);  
      setError('Failed to fetch tasks');
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      const res = await axios.post(RUBY_URL, { title, description });
      setTasks((prevTasks) => [...prevTasks, res.data]); 
      setTitle('');
      setDescription('');
      setError('');
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${RUBY_URL}/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 mt-10">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        {error && <div className="text-red-500">{error}</div>}
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          type="submit"
        >
          Add Task
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="border p-4 rounded flex justify-between items-start"
            >
              <div>
                <h2 className="font-semibold">{task.title}</h2>
                <p className="text-gray-600 text-sm">{task.description}</p>
              </div>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-500 hover:underline ml-4"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskOverview;
