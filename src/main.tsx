import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Order from './pages/Order';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Homepage,
  },
  {
    path: '/order',
    Component: Order,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);