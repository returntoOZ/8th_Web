import './App.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import HomePage from './pages/home'
import NotFound from './pages/not-found'
import MoviesPage from './pages/movie'
import RootLayout from './layout/root-layout'
import SearchPage from './pages/search'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        // /:을 활용해서, 동적으로 바뀌는 부분의 이름을 정의해줍시다.
        path: 'movies',
        element: <MoviesPage />
      },
      {
        path: 'search',
        element: <SearchPage/>
      }
    ]
  },
])

function App() {
  console.log(import.meta.env.VITE_TMDB_KEY);
  return <RouterProvider router={router} />
}

export default App
