//EXTERNAL IMPORTS
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//INTERNAL IMPORTS
import Body from './Components/Body';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Profile from './Components/Profile';

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path='/' element={<Body />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
