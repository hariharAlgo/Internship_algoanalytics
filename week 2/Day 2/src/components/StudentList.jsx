import React from 'react';
import Card from './Card';
import Button from './Button';

const StudentList = ({ students, onDelete }) => {
    if (!students || students.length === 0) {
        return <Card><p>No students found.</p></Card>;
    }

    return (
        <div className="student-list">
            {students.map((student) => (
                <Card key={student.id} className="student-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h4 style={{ margin: '0 0 5px 0' }}>{student.name}</h4>
                            <p style={{ margin: 0, color: '#666' }}>ID: {student.id}</p>
                        </div>
                        <Button variant="danger" onClick={() => onDelete(student.id)} style={{ padding: '5px 10px', fontSize: '14px' }}>
                            Remove
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default StudentList;
