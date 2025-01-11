import React from 'react';

const TaskControls = ({ setFilter, setSortOrder }) => {
    return (
        <div className="task-controls">
            <div>
                <label>Filter:</label>
                <select onChange={(e) => setFilter(e.target.value)} defaultValue="all">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                </select>
            </div>
            <div>
                <label>Sort Order:</label>
                <select onChange={(e) => setSortOrder(e.target.value)} defaultValue="asc">
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
        </div>
    );
};

export default TaskControls;
