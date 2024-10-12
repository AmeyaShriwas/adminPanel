import React, { useState } from 'react';

const AddPdf = ({ addPdf, closeModal }) => {
  const [pdfName, setPdfName] = useState('');
  const [pdfLink, setPdfLink] = useState('');

  const handleUpload = () => {
    if (pdfName && pdfLink) {
      const newPdf = { pdfName, pdfLink };
      addPdf(newPdf); // Pass the new PDF to the parent
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h1 className="text-2xl font-bold mb-4">Add PDF</h1>
        <div className="mb-4">
          <label className="block">PDF Name</label>
          <input
            type="text"
            value={pdfName}
            onChange={e => setPdfName(e.target.value)}
            className="border px-2 py-1 w-full"
            placeholder="Enter PDF name"
          />
        </div>
        <div className="mb-4">
          <label className="block">PDF Link</label>
          <input
            type="text"
            value={pdfLink}
            onChange={e => setPdfLink(e.target.value)}
            className="border px-2 py-1 w-full"
            placeholder="Enter PDF link"
          />
        </div>
        <div className="flex justify-end">
          <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 mr-2">Upload PDF</button>
          <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2">Close</button>
        </div>
      </div>
    </div>
  );
};

export default AddPdf;
