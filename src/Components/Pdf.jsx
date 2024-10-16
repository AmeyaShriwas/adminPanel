import React, { useState } from 'react';
import axios from 'axios'; // For handling HTTP requests
import Header from './Header';

const validCategories = ['HTML', 'CSS', 'JavaScript', 'ReactJS', 'NodeJS', 'ExpressJS', 'MongoDB', 'MySQL', 'Bootstrap']; // Valid categories
const ApiUrl = 'https://notesapi.ameyashriwas.in'; // Correct variable name

const notesData = {
  JavaScript: {
    name: 'JavaScript Basics',
    price: 300,
    img: 'path_to_js_image',
    pdfs: [
      { pdfName: 'JavaScript Basics', pdfLink: 'http://localhost:3001/pdf/1' },
      { pdfName: 'Advanced JavaScript', pdfLink: 'http://localhost:3001/pdf/2' },
    ],
  },
  ReactJS: {
    name: 'React Introduction',
    price: 300,
    img: 'path_to_react_image',
    pdfs: [
      { pdfName: 'React Introduction', pdfLink: 'http://localhost:3001/pdf/3' },
      { pdfName: 'React Hooks', pdfLink: 'http://localhost:3001/pdf/4' },
    ],
  },
};

const PdfList = () => {
  const [pdfsData, setPdfsData] = useState(notesData);
  const [currentSubject, setCurrentSubject] = useState('JavaScript');
  const [newPdf, setNewPdf] = useState({ pdfName: '', pdfLink: '', price: '' });
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null); // For storing the uploaded file

  const handleAddPdf = async () => {
    if (!file || file.length === 0) {
      alert('Please upload an image.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file[0]);  // Ensure you're sending the first file
    formData.append('pdfName', newPdf.pdfName); // PDF name
    formData.append('pdfPrice', newPdf.price);  // PDF price
  
    try {
      const response = await axios.post(`${ApiUrl}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set this header explicitly
        },
      });
  
      console.log('Upload successful:', response.data);
      alert('PDF uploaded successfully!');
      setShowModal(false); // Close modal on success
    } catch (error) {
      console.error('Error uploading PDF:', error);
      alert('Error uploading PDF. Please try again.');
    }
  };
  


  // Function to handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files);
  };

  // Get PDF list for the currently selected subject
  const currentPdfs = pdfsData[currentSubject].pdfs;

  return (
    <>
    <Header/>
    <div className='bg-white p-10 rounded-lg'>
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
      <table className="table-auto w-full mb-4 overflow-y-auto">
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
                  className="bg-yellow-500 text-white px-2 py-1 mr-2"
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding a new PDF */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add New PDF</h2>

            <div className="mb-2">
              <label className="block">Select PDF Category</label>
              <select
                value={newPdf.pdfName}
                onChange={(e) => setNewPdf({ ...newPdf, pdfName: e.target.value })}
                className="border px-2 py-1 w-full"
              >
                <option value="">Select a category</option>
                {validCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-2">
              <label className="block">PDF Link (Upload PDF File)</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="border px-2 py-1 w-full"
              />
            </div>

            <div className="mb-2">
              <label className="block">Price</label>
              <input
                type="number"
                value={newPdf.price}
                onChange={(e) => setNewPdf({ ...newPdf, price: e.target.value })}
                className="border px-2 py-1 w-full"
                placeholder="Enter Price"
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
    </>
  );
};

export default PdfList;
