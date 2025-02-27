import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/home/Home.jsx'
import NotFound from './pages/not-found/NotFound.jsx'
import Layout from './pages/layout/Layout.jsx'
import Quiz from './pages/quiz/Quiz.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='quiz' element={<Quiz />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </Layout>
  </BrowserRouter>
)
