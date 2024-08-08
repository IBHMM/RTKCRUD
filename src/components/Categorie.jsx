import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useGetCategoriesQuery, useDeleteCategoryMutation, useChangeCategoryMutation } from '../features/api/apiSlice';
import { likeCategory, dislikeCategory, addToBasket, removeFromBasket } from '../features/Category/CategorySlice';

export function Categories() {
  const { data, isLoading, error } = useGetCategoriesQuery();
  const [deleteCategory, deleteStatus] = useDeleteCategoryMutation();
  const [updateCategory, updatestatus] = useChangeCategoryMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [form, setForm] = useState({ description: '', name: '' });
  const dispatch = useDispatch();
  const likedCategories = useSelector((state) => state.category.likedCategories);
  const basketItems = useSelector((state) => state.category.basketItems);

  console.log("liked: ", likedCategories," baslet: " ,basketItems)

  const showEditModal = (category) => {
    setCurrentCategory(category);
    setForm(category);
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (updatestatus.isSuccess) {
      setIsModalVisible(false);
    }
  }, [updatestatus.isSuccess]);

  const handleOk = () => {
    updateCategory({ id: currentCategory.id, ...form });
    updateCategory(currentCategory);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    deleteCategory(id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleLike = (category) => {
    if (!likedCategories.some(item => item.id === category.id)) {
      console.log(category)
      dispatch(likeCategory(category));
    } else {
      dispatch(dislikeCategory(category));
    }
  };

  const handleBasket = (category) => {
    if (!basketItems.some(item => item.id === category.id)) {
      console.log(category)
      dispatch(addToBasket(category));
    } else {
      dispatch(removeFromBasket(category));
    }
  };

  return (
    <div className="w-[100%] flex items-center justify-center">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((category) => (
              <tr key={category.id}>
                <td className="border px-4 py-2">{category.id}</td>
                <td className="border px-4 py-2">{category.description}</td>
                <td className="border px-4 py-2">{category.name}</td>
                <td className="border px-4 py-2 flex items-center justify-start">
                  <button
                    onClick={() => showEditModal(category)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    {deleteStatus.isLoading ? 'Deleting...' : 'Delete'}
                  </button>
                  <button
                    onClick={() => handleLike(category)}
                    className={`font-bold py-2 px-4 rounded mr-2 ${
                      likedCategories.some(item => item.id === category.id)
                        ? 'bg-green-500 hover:bg-green-700 text-white'
                        : 'bg-gray-500 hover:bg-gray-700 text-white'
                    }`}
                  >
                    {likedCategories.some(item => item.id === category.id) ? 'Unlike' : 'Like'}
                  </button>
                  <button
                    onClick={() => handleBasket(category)}
                    className={`font-bold py-2 px-4 rounded ${
                      basketItems.some(item => item.id === category.id)
                        ? 'bg-yellow-500 hover:bg-yellow-700 text-white'
                        : 'bg-gray-500 hover:bg-gray-700 text-white'
                    }`}
                  >
                    {basketItems.some(item => item.id === category.id) ? 'Remove from Basket' : 'Add to Basket'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalVisible && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Category</h3>
                    <div className="mt-2">
                      <form>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description
                          </label>
                          <input
                            id="description"
                            name="description"
                            type="text"
                            value={form.description}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleOk}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {updatestatus.isLoading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={handleCancel}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
