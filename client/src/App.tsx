import React, { useState } from 'react';
import Home from './components/Home';
import Report from './components/Report';

const App: React.FC = () => {
  const [isReportOpen, setIsReportOpen] = useState(false);

  const toggleReportPopup = () => {
    setIsReportOpen(!isReportOpen);
  };

  return (
    <div className="">
      <div className="flex-1 bg-white shadow-2xl rounded-lg p-8 mx-2 relative overflow-hidden">
        <Home />
      </div>
      <button
        onClick={toggleReportPopup}
        type="button"
        className="absolute top-20 right-20 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        View Report
        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
        </svg>
      </button>
      {isReportOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-10">
          <div className="bg-white rounded-lg p-8 max-w-3xl w-full relative shadow-lg transition-transform transform scale-95 duration-300">
            <button
              onClick={toggleReportPopup}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition duration-200 mt-5"
            >
              <span className='text-2xl rounded-2xl border border-black text-black py-2 px-4 '>&times;</span> {/* Close icon */}
            </button>
            <Report />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
