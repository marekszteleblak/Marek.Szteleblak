import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import TaskControls from './TaskControls';
import '../App.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('asc');
    const [categoryFilter, setCategoryFilter] = useState('all');

    useEffect(() => {
        fetch('/api/tasks')
            .then((response) => response.json())
            .then((data) => setTasks(data))
            .catch((error) => console.error('Error fetching tasks:', error));
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
            } else {
                console.error('Failed to delete task');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpdate = async (id, updatedTask) => {
        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTask),
            });

            if (response.ok) {
                const updated = await response.json();
                setTasks((prevTasks) =>
                    prevTasks.map((task) => (task._id === id ? updated : task))
                );
            } else {
                console.error('Failed to update task');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed' && !task.completed) return false;
        if (filter === 'pending' && task.completed) return false;
        if (categoryFilter !== 'all' && task.category !== categoryFilter) return false;
        return true;
    });

    const sortedTasks = filteredTasks.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.title.localeCompare(b.title);
        } else {
            return b.title.localeCompare(a.title);
        }
    });

    return (
        <div>
            <TaskForm onTaskAdded={(newTask) => setTasks((prev) => [...prev, newTask])} />
            <TaskControls setFilter={setFilter} setSortOrder={setSortOrder} />
            <ul>
                {sortedTasks.map((task) => (
                    <TaskItem
                        key={task._id}
                        task={task}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
