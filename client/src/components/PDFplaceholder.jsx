import React from 'react';
import { Page } from 'react-pdf';

const PDFViewer = () => {
    return (
        <div style={{ width: '100%', maxHeight: '650px', overflow: 'auto' }}>
            <Page
                width={850}
                height={650}
                render={() => (
                    <div style={{ textAlign: 'center', paddingTop: '300px'}}>
                        <p>No file uploaded</p>
                    </div>
                )}
            />
        </div>
    );
};

export default PDFViewer;

