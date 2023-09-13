import {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


import Home from './pages/Home';
import CreateUser from './pages/CreateUser';
import UpdateUser from './pages/UpdateUser';
import NotFound from './pages/NotFound';

const App = () => {
  const [currId, setCurrId] = useState(null);
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home setCurrId={setCurrId} />} />
      <Route path="/create" element={<CreateUser currId={currId} />} />
      <Route path="/update" element={<UpdateUser currId={currId} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>  
}

export default App
