import React from 'react';
import Card from './Card';

const TaskList = ({ tasks }) => {
    return (
        <Card>
            <h3>Task List</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {tasks.map((task, index) => (
                    <li key={index} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                        {task}
                    </li>
                ))}
            </ul>
        </Card>
    );
};

export default TaskList;
