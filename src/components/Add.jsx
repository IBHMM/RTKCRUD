import React, { useEffect, useState } from 'react';
import { useAddCategoryMutation } from '../features/api/apiSlice';

const AddCategory = ({ initialData = { name: '', description: '' }}) => {
    const [formData, setFormData] = useState(initialData);
    const [AddCategory, submitstate] = useAddCategoryMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AddCategory(formData);
  };

  useEffect(() => {
    if (submitstate.isSuccess) {
      setFormData(initialData);
    }
  }, [submitstate.isSuccess])

  return (
    <form className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter category name"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter category description"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          {submitstate.isLoading  ? "Submiting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export {AddCategory};
