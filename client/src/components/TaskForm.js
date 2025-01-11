import React, { useState } from 'react';

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [category, setCategory] = useState('General');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert('Task title cannot be empty');
            return;
        }

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description, date, category }),
            });

            if (response.ok) {
                const newTask = await response.json();
                onTaskAdded(newTask);
                // Reset form fields after successful submission
                setTitle('');
                setDescription('');
                setDate(new Date().toISOString().split('T')[0]);
                setCategory('General');
            } else {
                const errorData = await response.json();
                console.error('Failed to add task:', errorData.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Title:
                    <input
                        type="text"
                        placeholder="Enter a task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Description:
                    <textarea
                        placeholder="Enter a task description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="3"
                        required
                    ></textarea>
                </label>
            </div>
            <div>
                <label>
                    Due Date:
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Category:
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="General">General</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
            </div>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
