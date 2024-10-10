import { Route, Routes } from 'react-router-dom';

import './App.css'

import Login from './components/login';
import Signup from './components/signup';
import Home from './components/profile';
import AddImg from './components/addImg';
import AddDocs from './components/adddocs'
import Test from './components/test';

function App() {
  return (
    <>
    <div className='outside'>
    <header className='poppins'>
    <h1>docsave.io</h1>
    <h3>Assignment</h3>
    </header>
    <main>
    <Routes>
    <Route path='/' element={<Test />}> </Route>

      <Route path='/login' element={<Login />}> </Route>

      <Route path='/signup' element={<Signup />}> </Route>

      <Route path='/home' element={<Home />}></Route>

      <Route path='/addimg/:id' element={<AddImg />}> </Route>

      <Route path='/addDocs/:id' element={<AddDocs />}> </Route>
    </Routes>    
    </main>
    <footer>
      <span className='statliche contact'>
        developded by - Digvijay singh malik, +919306025596
      </span>
      <a className='outfit contactEmail' href='mailto:dig.malik1911@gmail.com'>
        dig.malik1911@gmail.com
      </a>
    </footer>
    </div>
    </>
  )
}

export default App
