import './index.css'
import GameList from './pages/GameList';
import GameInfo from './pages/GameInfo/GameInfo';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<GameList/>}/>
        <Route path='/games' element={<GameList/>}/>
        <Route path='/games/:id' element={<GameInfo/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>    
    </BrowserRouter>
  )
}

export default App
