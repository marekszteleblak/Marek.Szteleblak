import React, { useState } from 'react';
import TaskEditForm from './TaskEditForm';

const TaskItem = ({ task, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = (id, updatedTask) => {
        onUpdate(id, updatedTask);
        setIsEditing(false);
    };

    return (
        <li className={`task-item ${task.completed ? 'completed' : ''}`}>
            {isEditing ? (
                <TaskEditForm
                    task={task}
                    onCancel={() => setIsEditing(false)}
                    onSave={handleSave}
                />
            ) : (
                <>
                <div className="task-container">
        <div className="task-left">
            <div className="task-title">{task.title}</div>
            <div className="task-description">{task.description || 'No description provided.'}</div>
        </div>
        <div className="task-right">
            <div className="task-category">{task.category}</div>
            <div className="task-information">
                <div>{task.completed ? 'Completed' : 'Pending'}</div>
                <div>{task.date && task.date.split('T')[0]}</div>
            </div>
            <div className="task-actions">
                <button onClick={() => setIsEditing(true)} className="edit-button">Edit</button>
                <button onClick={() => onDelete(task._id)} className="delete-button">Delete</button>
            </div>
        </div>
    </div>
                    
                   
                </>
            )}
        </li>
    );
};

export default TaskItem;
