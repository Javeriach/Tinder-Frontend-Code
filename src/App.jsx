//EXTERNAL IMPORTS
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
//INTERNAL IMPORTS
import Body from './Components/Body';
import Login from './Pages/Login';
import AppStore from './Redux/appStore';
import Feed from './Pages/Feed';
import HomePage from './Pages/HomePage';
import { Suspense, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { SocketProvider } from './Sockets/socketContext';
import { lazy } from 'react';

function App() {
  useEffect(() => {
    // ..
    AOS.init();
  }, []);



// ===================LAZY LOADING=======================
  const Connections = lazy(() => import('./Pages/Connections'));
  const Profile = lazy(() => import('./Pages/Profile'));
  const  Requests = lazy(() => import('./Pages/Requests'));
  const BuySubscription = lazy(() => import('./Pages/BuySubscription'));
  const Chat = lazy(() => import('./Pages/Chat'));


  return (
    <>
      <Provider store={AppStore}>
        <SocketProvider>
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/" element={<Body />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Suspense fallback={<h1>Content Loading</h1>}><Profile /></Suspense>} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/connections" element={<Suspense fallback={<h1>Content Loading</h1>}> <Connections />
                </Suspense>} />
                <Route path="/requests" element={<Suspense fallback={<h1>Content Loading</h1>}><Requests /></Suspense>} />
                <Route path="/premium" element={<Suspense fallback={<h1>Content Loading</h1>}><BuySubscription /></Suspense>} />
                <Route path="/chat/:targetUserId?" element={<Suspense fallback={<h1>Content Loading</h1>}><Chat /></Suspense>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SocketProvider>
      </Provider>
    </>
  );
}

export default App;
