import { Routes, Route, HashRouter } from 'react-router-dom';
import Navbar from './components/navbar.jsx'
import Home from './pages/home.jsx';
import AboutUs from './pages/about-us.jsx';
import Contact from './pages/contact.jsx';
import Error from './pages/404.jsx';
import Footer from './components/footer.jsx';

export default function App() {
  return (
    <HashRouter>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='*' element={<Error />} />
      </Routes>
    <Footer/>
  </HashRouter>
  );
}