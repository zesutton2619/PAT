import React from 'react';
import PDFViewer from './PDFViewer'; // Assuming PDFViewer is a component that renders PDF

const Display = ({ patents }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Patent Display</h2>
            <div className="patents-container grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {patents.map((patent, index) => (
                    <div key={index} className="w-full patent-card p-4 border rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">{patent.name}</h3>
                        <div className="pdf-container border border-gray-300 rounded-lg p-2 overflow-auto">
                            <PDFViewer pdfUrl={URL.createObjectURL(patent)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Display;
