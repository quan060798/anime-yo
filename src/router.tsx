import { createBrowserRouter, Navigate } from 'react-router-dom';
import AnimeHomePage from './pages/Anime/Home';
import MainLayout from './components/Layout';
import AnimeDetailPage from './pages/Anime/Detail/index';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <AnimeHomePage />,
      },
      {
        path: 'anime/:id',
        element: <AnimeDetailPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]); 