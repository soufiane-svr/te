import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Register from './form/Register';
import Login from './form/login';
import Daschbord from './pages/dashbord/Daschbord';
import {ToastContainer} from 'react-toastify'
import { useState } from 'react';

function App() {
  
  const  [userInfo,setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')))

  return (
    <BrowserRouter>
    <ToastContainer theme='colored' />
      <Routes>
        <Route path='/' element={userInfo?.token ? <Daschbord/> : <Login/>}  />
        <Route path='/register' element={<Register/>} />
        <Route path='/Login' element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
