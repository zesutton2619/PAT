import React from 'react';
import PDFViewer from './PDFViewer'; // Assuming PDFViewer is a component that renders PDF

const Display = ({ patents }) => {
    return (
        <div>
            <div className="flex">
                <h1 className="text-3xl font-bold border-gray-600 mb-2 text-center mx-auto mb-6">Compared Patents</h1>
            </div>
            <div className="patents-container grid gap-8 grid-cols-1 md:grid-cols-2 mx-20"
                 style={{gridAutoCols: '1fr'}}>
                {patents.map((patent, index) => (
                    <div key={index}
                         className="w-full patent-card p-3 border-gray-800 border-4 rounded-lg">
                        <h3 className="text-2xl font-bold border-gray-700 mb-2 text-center">{index === 0 ? 'YOUR PATENT' : 'MOST SIMILAR PATENT'}</h3>
                        <h3 className="text-xl font-bold border-gray-700 mb-2 text-center">Patent: {patent.name}</h3>
                        <div className="pdf-container border border-gray-300 rounded-lg p-2 overflow-auto">
                            <PDFViewer pdfUrl={URL.createObjectURL(patent)}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Display;
