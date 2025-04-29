import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import HomeLayout from './layouts/HomeLayout'
import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import MyPage from './pages/MyPage'
import { AuthProvider } from './context/AuthContext'
import ProtectedLayout from './layouts/ProtectedLayout'
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage'

// 1. 홈페이지
// 2. 로그인 페이지
// 3. 회원가입 페이지

// publicRoutes : 인증없이 접근 가능한 라우트
const publicRoutes:RouteObject[] = [
  {
    path: '/',
    element: <HomeLayout/>,
    errorElement: <NotFoundPage/>,
    children: [
      {
        index: true,
        element: <HomePage/>
      },
      {
        path: 'login',
        element: <LoginPage/>
      },
      {
        path: 'signup',
        element: <SignUpPage/>
      },
      {
        path: '/v1/auth/google/callback',
        element: <GoogleLoginRedirectPage/>
      },
    ]
  }
];

// protectedRoutes : 인증이 필요한 라우트
const protectedRoutes:RouteObject[] = [
  {
    path: '/',
    element: <ProtectedLayout/>,
    errorElement: <NotFoundPage/>,
    children: [
      {
        path: 'my',
        element: <MyPage/>
      },
    ]
  }
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes])

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}

export default App
