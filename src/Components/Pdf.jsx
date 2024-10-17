import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For handling HTTP requests
import Header from './Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validCategories = ['HTML', 'CSS', 'JavaScript', 'ReactJS', 'NodeJS', 'ExpressJS', 'MongoDB', 'MySQL', 'Bootstrap']; // Valid categories
const ApiUrl = 'https://notesapi.ameyashriwas.in'; // API base URL

const PdfList = () => {
  const [pdfsData, setPdfsData] = useState([]); // State to hold PDF data
  const [currentSubject, setCurrentSubject] = useState('');
  const [newPdf, setNewPdf] = useState({ pdfName: '', pdfLink: '', price: '', pdfSubTypes: [] });
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null); // For storing the uploaded file (PDF)
  const [image, setImage] = useState(null); // For storing the uploaded image
  const [subCategory, setSubCategory] = useState(''); // For storing new subcategory input
  const [subCategories, setSubCategories] = useState([]); // For storing list of subcategories

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/api/collections`);
        setPdfsData(response.data);
        console.log('resp', response.data);
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    };

    fetchCollections();
    console.log('cu', currentSubject)
  }, []);

  useEffect(() => {
    console.log('cu', currentSubject)

  }, [currentSubject])


  // Function to handle adding subcategories
  const handleAddSubCategory = () => {
    if (subCategory.trim()) {
      const findCategory = subCategories.find((a) => a === subCategory);
      if (findCategory) {
        alert('Already present in these');
        return null;
      } else {
        setSubCategories([...subCategories, subCategory.trim()]);
        setSubCategory('');
      }
    }
  };

  // Function to remove subcategory
  const handleRemoveSubCategory = (index) => {
    setSubCategories(subCategories.filter((_, i) => i !== index));
  };

  const handleAddPdf = async () => {
    if (!file || file.length === 0 || !image || image.length === 0) {
      alert('Please upload a PDF and an image.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file[0]); // Ensure you're sending the first PDF file
    formData.append('pdfName', newPdf.pdfName); // PDF name
    formData.append('pdfPrice', newPdf.price); // PDF price
    formData.append('pdfImg', image[0]); // Image
    formData.append('pdfSubTypes', JSON.stringify(subCategories)); // Subcategories

    try {
      const response = await axios.post(`${ApiUrl}/api/upload`, formData);
      toast.success(response.data.message);
      setShowModal(false); // Close modal on success
    } catch (error) {
      toast.error(error.message);
      console.error('Error uploading PDF:', error);
    }
  };

  // Function to handle file input change for PDFs
  const handleFileChange = (e) => {
    setFile(e.target.files);
  };

  // Function to handle image input change
  const handleImageChange = (e) => {
    setImage(e.target.files);
  };

  // Get PDF list for the currently selected subject

  return (
    <>
      <Header />
      <div className='bg-white p-10 rounded-lg'>
        <h1 className="text-2xl font-bold mb-4">PDF Manager</h1>

        {/* Dropdown to select a category (subject) */}
        <div className="mb-4">
          <label className="block mb-2">Select Category:</label>
          <select
            // value={currentSubject}
            onChange={(e) => setCurrentSubject(e.target.value)}
            className="border px-2 py-1"
          >
            <option value="">select pdf</option>
            {pdfsData?.map((subject) => (
              <option key={subject} value={subject.pdfName}>
                {subject.pdfName}
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

        {pdfsData.map((obj) => {
          if (obj.pdfName !== currentSubject) {
            <div>
              <h1>Select Subtypes to see data</h1>
              </div>
           
          }

          return (
            <table key={obj._id} className="min-w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border border-gray-300">Subtypes</th>
                  <th className="px-4 py-2 border border-gray-300">Delete</th>
                  <th className="px-4 py-2 border border-gray-300">Edit</th>
                </tr>
              </thead>
              <tbody>
                {obj.pdfSubTypes.map((subType, index) => (
                  <tr key={index} className="border-t border-gray-300">
                    <td className="px-4 py-2 border border-gray-300">{subType}</td>
                    <td className="px-4 py-2 border border-gray-300">
                      <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          );
        })}



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
                <label className="block">PDF Image (Upload Image)</label>
                <input
                  type="file"
                  onChange={handleImageChange}
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

              <div className="mb-2">
                <label className="block">Add Subcategories</label>
                <input
                  type="text"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="border px-2 py-1 w-full"
                  placeholder="Enter Subcategory"
                />
                <button
                  onClick={handleAddSubCategory}
                  className="bg-gray-500 text-white px-2 py-1 mt-2"
                >
                  Add Subcategory
                </button>

                <div className="mt-2 overflow-y-scroll" style={{ height: '160px' }}>
                  {subCategories.map((sub, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{sub}</span>
                      <button onClick={() => handleRemoveSubCategory(index)} className="text-red-500">Remove</button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleAddPdf}
                className="bg-blue-500 text-white px-4 py-2 mt-2"
              >
                Add PDF
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 mt-2 ml-2"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </>
  );
};

export default PdfList;
