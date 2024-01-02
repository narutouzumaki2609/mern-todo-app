import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import LoginPage from './components/LoginPage';
import Todo from './components/Todo';
import Update from './components/Update';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from './components/store';

function App() {
  const Dispatch=useDispatch();
  useEffect(()=>{
    const id=sessionStorage.getItem('id');
    if(id){
      Dispatch(authActions.login());
    }
  },[])
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Todo' element={<Todo/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/Login' element={<LoginPage/>}/>
        <Route path='/Update' element={<Update/>}/>
      </Routes>
      
      
    </div>
  );
}

export default App;
