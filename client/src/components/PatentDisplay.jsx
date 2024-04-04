import React from 'react';
import PDFViewer from './PDFViewer'; // Assuming PDFViewer is a component that renders PDF
import placeholderPDF from './placeholder-pdf.pdf'; // Import the placeholder PDF file

const Display = ({ patents }) => {
    const yourArray = [{ title: 'Patent: None ' }, { title: 'Patent: None' }];


    return (
        <div className="flex bg-white shadow-lg mx-5 rounded-sm border border-gray-300 px-8 p-5 w-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 mt-7">
            <div>
                <div className="flex">
                    <h1 className="text-3xl font-bold text-gray-700 border-gray-600 mb-2 text-center mx-auto mb-6">Compared Patents</h1>
                </div>

                <div className="patents-container grid gap-8 grid-cols-1 md:grid-cols-2 mx-20"
                     style={{gridAutoCols: '1fr'}}>
                    {
                        patents.length === 0 ? (
                            yourArray.map((item, index) => (
                                <div className="patent-card p-3 border-gray-800 border-4 rounded-lg"
                                     style={{minWidth: '100%', maxWidth: 'calc(100% - 20px)', margin: '0 auto'}}>
                                    <h3 className="text-2xl font-bold border-gray-700 mb-2 text-center">No Patents Found</h3>
                                    <div className="pdf-container border border-gray-300 rounded-lg p-2 overflow-auto">
                                        <PDFViewer pdfUrl={placeholderPDF}/>
                                    </div>
                                </div>
                            ))
                        ) : (
                            patents.map((patent, index) => (
                                <div key={index}
                                     className="patent-card p-3 border-gray-800 border-4 rounded-lg"
                                     style={{minWidth: '100%', maxWidth: 'calc(100% - 20px)', margin: '0 auto'}}>
                                    <h3 className="text-2xl font-bold border-gray-700 mb-2 text-center">{index === 0 ? 'YOUR PATENT' : 'MOST SIMILAR PATENT'}</h3>
                                    <h3 className="text-xl font-bold border-gray-700 mb-2 text-center">Patent: {patent.name}</h3>
                                    <div className="pdf-container border border-gray-300 rounded-lg p-2 overflow-auto">
                                        <PDFViewer pdfUrl={URL.createObjectURL(patent)}/>
                                    </div>
                                </div>
                            ))
                        )}
                </div>
            </div>
        </div>
    );
};

export default Display;


