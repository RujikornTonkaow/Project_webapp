

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menupage from './Screen/Menupage';
import FirstPage from './Screen/FirstPage';
import Login from './Screen/LoginPage';
import Register from './Screen/RegisterPage';
import Home from './Screen/HomePage';
import About from './Screen/AboutPage';
import TablePage from './Screen/TablePage';
import Chefpage from './Screen/Chefpage';
import TableBooking from './Screen/TableBooking';
import SetTime from './Screen/SetTime';
import DetailBooking from './Screen/DetailBooking';
import Account from './Screen/AccountPage';
import AboutAdmin from './Screen/AboutAdmin';
import MenuAdmin from './Screen/MenuAdmin';
import ChefAdmin from './Screen/ChefAdmin';
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route index element={<Home/>}/>
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>}/>
        <Route path="home" element={<Home/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="menupage" element={<Menupage/>}/>
        <Route path="tablepage" element={<TablePage/>}/>
        <Route path="chefpage" element={<Chefpage/>}/>
        <Route path="tablebooking" element={<TableBooking/>}/>
        <Route path="settime" element={<SetTime/>}/>
        <Route path="first" element={<FirstPage/>}/>
        <Route path="account" element={<Account/>}/>
        <Route path="detailbooking" element={<DetailBooking/>}/>
        <Route path="aboutad" element={<AboutAdmin/>}/>
        <Route path="menuad" element={<MenuAdmin/>}/>
        <Route path="chefad" element={<ChefAdmin/>}/>

      </Routes>
    </BrowserRouter>
  );
}
// dfds
export default App;
