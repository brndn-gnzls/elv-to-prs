import React from 'react';

export const ButtonDetailPage = () => (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1>🔘 Button Component Detail Page</h1>
        <iframe
            src="http://localhost:6006/?path=/story/components-button--default&singleStory=true&panelPosition=bottom"
            style={{
                width: '100%',
                height: '800px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                marginTop: '20px'
            }}
            title="Button Component Storybook Embed"
        />
    </div>
);