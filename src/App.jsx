//EXTERNAL IMPORTS
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
//INTERNAL IMPORTS
import Body from './Components/Body';
import Login from './Components/Login';
import Profile from './Components/Profile';
import AppStore from './utiles/appStore';
import Feed from './Components/Feed';
import Connections from './Components/Connections/Connections';
import Requests from './Components/Requests/Requests';
import HomePage from './Components/HomePage';
console.log("hello");
function App() {
  return (
    
    <>
      <Provider store={AppStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
