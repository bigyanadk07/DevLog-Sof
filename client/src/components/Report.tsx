import React, { useEffect, useState } from 'react';

const Report: React.FC = () => {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    const generateReport = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/reports', {
                method: 'GET',
            });
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            setPdfUrl(url); // Set the PDF URL for display
        } catch (error) {
            console.error('Error generating report:', error);
        }
    };

    useEffect(() => {
        generateReport(); // Generate report when component mounts
    }, []);

    const handleDownload = () => {
        if (pdfUrl) {
            const a = document.createElement('a');
            a.href = pdfUrl;
            a.download = 'devlog_report.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
        }
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg font-2">
            <h2 className="text-3xl font-bold mb-4 text-center ">Devlog Report</h2>
            {pdfUrl ? (
                <>
                    <iframe
                        src={pdfUrl}
                        title="Report PDF"
                        className="w-full h-96 border border-gray-300 rounded-md"
                    ></iframe>  
                    <div className='flex justify-center'>
                    <button
                        onClick={handleDownload}
                        className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                        </svg>
                        <span>Download</span>
                    </button>
                    </div>
                </>
            ) : (
                <p className="text-center text-gray-600">Loading report...</p>
            )}
        </div>
    );
};

export default Report;
