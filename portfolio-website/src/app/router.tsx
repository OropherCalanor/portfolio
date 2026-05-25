import { createBrowserRouter } from 'react-router-dom'
import { SiteLayout } from '../components/layout/SiteLayout'
import { BlogDetailPage } from '../pages/BlogDetailPage'
import { BlogPage } from '../pages/BlogPage'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProjectDetailPage } from '../pages/ProjectDetailPage'
import { ProjectsPage } from '../pages/ProjectsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SiteLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'projects/:slug', element: <ProjectDetailPage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'blog/:slug', element: <BlogDetailPage /> },
    ],
  },
])
