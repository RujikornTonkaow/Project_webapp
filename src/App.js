

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menupage from './screen/Menupage';
import Firstpage from './screen/Firstpage'
import Login from './screen/LoginPage';
import Register from './screen/RegisterPage';
import Home from './screen/HomePage';
import About from './screen/AboutPage';
import TablePage from './screen/TablePage';
import Chefpage from './screen/Chefpage';
import TableBooking from './screen/TableBooking';
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route index element={<Firstpage/>}/>
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>}/>
        <Route path="home" element={<Home/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="menupage" element={<Menupage/>}/>
        <Route path="tablepage" element={<TablePage/>}/>
        <Route path="chefpage" element={<Chefpage/>}/>
        <Route path="tablebooking" element={<TableBooking/>}/>

      </Routes>
    </BrowserRouter>
  );
}
// dfds
export default App;
