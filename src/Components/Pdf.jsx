import React, { useState } from 'react';

const notesData = {
  JavaScript: {
    name: 'JavaScript Basics',
    price: 300,
    img: 'path_to_js_image',
    pdfs: [
      { pdfName: 'JavaScript Basics', pdfLink: 'http://localhost:3001/pdf/1' },
      { pdfName: 'Advanced JavaScript', pdfLink: 'http://localhost:3001/pdf/2' },
      { pdfName: 'JavaScript Basics', pdfLink: 'http://localhost:3001/pdf/1' },
      { pdfName: 'Advanced JavaScript', pdfLink: 'http://localhost:3001/pdf/2' },
      { pdfName: 'JavaScript Basics', pdfLink: 'http://localhost:3001/pdf/1' },
      { pdfName: 'Advanced JavaScript', pdfLink: 'http://localhost:3001/pdf/2' },
      { pdfName: 'JavaScript Basics', pdfLink: 'http://localhost:3001/pdf/1' },
      { pdfName: 'Advanced JavaScript', pdfLink: 'http://localhost:3001/pdf/2' }
    ]
  },
  ReactJS: {
    name: 'React Introduction',
    price: 300,
    img: 'path_to_react_image',
    pdfs: [
      { pdfName: 'React Introduction', pdfLink: 'http://localhost:3001/pdf/3' },
      { pdfName: 'React Hooks', pdfLink: 'http://localhost:3001/pdf/4' },
      { pdfName: 'React Introduction', pdfLink: 'http://localhost:3001/pdf/3' },
      { pdfName: 'React Hooks', pdfLink: 'http://localhost:3001/pdf/4' },
      { pdfName: 'React Introduction', pdfLink: 'http://localhost:3001/pdf/3' },
      { pdfName: 'React Hooks', pdfLink: 'http://localhost:3001/pdf/4' },
      { pdfName: 'React Introduction', pdfLink: 'http://localhost:3001/pdf/3' },
      { pdfName: 'React Hooks', pdfLink: 'http://localhost:3001/pdf/4' }
    ]
  }
};

const PdfList = () => {
  const [pdfsData, setPdfsData] = useState(notesData);
  const [currentSubject, setCurrentSubject] = useState('JavaScript'); // Default subject
  const [newPdf, setNewPdf] = useState({ pdfName: '', pdfLink: '', subject: currentSubject });
  const [showModal, setShowModal] = useState(false);

  // Function to handle adding a new PDF
  const handleAddPdf = () => {
    const updatedPdfs = {
      ...pdfsData,
      [newPdf.subject]: {
        ...pdfsData[newPdf.subject],
        pdfs: [...pdfsData[newPdf.subject].pdfs, { pdfName: newPdf.pdfName, pdfLink: newPdf.pdfLink }]
      }
    };
    setPdfsData(updatedPdfs);
    setNewPdf({ pdfName: '', pdfLink: '', subject: currentSubject });
    setShowModal(false); // Close modal after adding PDF
  };

  // Function to handle updating a PDF
  const handleUpdatePdf = (subject, index, updatedPdf) => {
    const updatedPdfs = {
      ...pdfsData,
      [subject]: {
        ...pdfsData[subject],
        pdfs: pdfsData[subject].pdfs.map((pdf, i) => (i === index ? updatedPdf : pdf))
      }
    };
    setPdfsData(updatedPdfs);
  };

  // Function to handle deleting a PDF
  const handleDeletePdf = (subject, index) => {
    const updatedPdfs = {
      ...pdfsData,
      [subject]: {
        ...pdfsData[subject],
        pdfs: pdfsData[subject].pdfs.filter((_, i) => i !== index)
      }
    };
    setPdfsData(updatedPdfs);
  };

  // Get PDF list for the currently selected subject
  const currentPdfs = pdfsData[currentSubject].pdfs;

  return (
    <div className='bg-white'>
      <h1 className="text-2xl font-bold mb-4">PDF Manager</h1>

      {/* Dropdown to select a category (subject) */}
      <div className="mb-4">
        <label className="block mb-2">Select Category:</label>
        <select
          value={currentSubject}
          onChange={(e) => setCurrentSubject(e.target.value)}
          className="border px-2 py-1"
        >
          {Object.keys(pdfsData).map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>

        <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 mt-2 float-right mb-5"
      >
        Add PDF
      </button>

      </div>

      {/* Table to display PDFs of the selected subject */}
      <table className="table-auto w-full mb-4">
        <thead>
          <tr className="text-left">
            <th className="border px-4 py-2">PDF Name</th>
            <th className="border px-4 py-2">PDF Link</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPdfs.map((pdf, index) => (
            <tr key={`${currentSubject}-${index}`}>
              <td className="border px-4 py-2">{pdf.pdfName}</td>
              <td className="border px-4 py-2">
                <a href={pdf.pdfLink} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                  {pdf.pdfLink}
                </a>
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleUpdatePdf(currentSubject, index, { pdfName: 'Updated Name', pdfLink: pdf.pdfLink })}
                  className="bg-yellow-500 text-white px-2 py-1 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePdf(currentSubject, index)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to open Add PDF modal */}
    
      {/* Modal for adding a new PDF */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add New PDF</h2>

            <div className="mb-2">
           <select  className="border px-2 py-1 w-full">
             <option>Select Category</option>
             <option>HTML</option>
             <option>CSS</option>
             <option>Javascript</option>
             <option>React Js</option>
           </select>
            </div>

            <div className="mb-2">
              <label className="block">PDF Name</label>
              <input
                type="text"
                value={newPdf.pdfName}
                onChange={(e) => setNewPdf({ ...newPdf, pdfName: e.target.value })}
                className="border px-2 py-1 w-full"
                placeholder="Enter PDF name"
              />
            </div>
            <div className="mb-2">
              <label className="block">PDF Link</label>
              <input
                type="file"
                value={newPdf.pdfLink}
                onChange={(e) => setNewPdf({ ...newPdf, pdfLink: e.target.value })}
                className="border px-2 py-1 w-full"
                placeholder="Enter PDF link"
              />
            </div>
            <button
              onClick={handleAddPdf}
              className="bg-green-500 text-white px-4 py-2 mt-2"
            >
              Add PDF
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-500 text-white px-4 py-2 mt-2 ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfList;
