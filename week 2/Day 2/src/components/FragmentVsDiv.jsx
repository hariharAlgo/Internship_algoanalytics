import React from 'react';
import Card from './Card';

const FragmentVsDiv = () => {
    return (
        <Card>
            <h3>Fragment vs Div Comparison</h3>
            <p>Inspect the DOM to see the difference.</p>

            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <div style={{ border: '1px dashed blue', padding: '10px' }}>
                    <h4>Wrapped with &lt;div&gt;</h4>
                    {/* This adds an extra node to the DOM */}
                    <div className="wrapper-div">
                        <p>Item 1</p>
                        <p>Item 2</p>
                    </div>
                </div>

                <div style={{ border: '1px dashed green', padding: '10px' }}>
                    <h4>Wrapped with &lt;&gt;</h4>
                    {/* This does NOT add an extra node to the DOM */}
                    <>
                        <p>Item 1</p>
                        <p>Item 2</p>
                    </>
                </div>
            </div>
            <p style={{ fontSize: '0.8em', color: '#666', marginTop: '10px' }}>
                Note: The blue box has an extra `div` wrapper inside. The green box has the items directly inside the parent container.
            </p>
        </Card>
    );
};

export default FragmentVsDiv;
