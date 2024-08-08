import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Main } from './pages/index.jsx';
import { Categories } from './components/Categorie.jsx';
import { AddCategory } from './components/Add.jsx';
import { Basket } from './components/basket.jsx';
import { Liked } from './components/like.jsx';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "categories",
        element: <Categories />
      },
      {
        path: "add",
        element: <AddCategory />
      },
      {
        path: "favourite",
        element: <Liked />
      },
      {
        path: "basket",
        element: <Basket />
      }
    ]
  }
]);
