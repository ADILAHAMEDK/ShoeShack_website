import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Login from './pages/Login'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProducts from './admin/AddProducts'
import SeeAll from './pages/SeeAll'
import AdminHomePage from './admin/AdminHomePage'

function App() {
  return (
    <>
      <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/addProducts" element={<AddProducts />} />
      <Route path='/seeAll' element={<SeeAll />} />
      <Route path='/adminHomePage' element={<AdminHomePage />} />
    
      {/* 
      <Route path="/seeall" element={<SeeAll />} /> */}
    </Routes>
    <ToastContainer />
    </BrowserRouter>
    </>
  )
}

export default App
