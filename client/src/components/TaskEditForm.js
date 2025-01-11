import React, { useState } from 'react';

const TaskEditForm = ({ task, onCancel, onSave }) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description || '');
    const [date, setDate] = useState(task.date ? task.date.split('T')[0] : '');
    const [category, setCategory] = useState(task.category || 'General');
    const [completed, setCompleted] = useState(task.completed);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(task._id, { title, description, date, category, completed });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Title:
                    <input
                        type="text"
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter a description"
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
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)}
                    />
                    Completed
                </label>
            </div>
            <div>
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default TaskEditForm;
