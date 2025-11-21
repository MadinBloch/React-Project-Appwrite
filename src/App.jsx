
import { useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import config from './config/config'
import authService from './appwrite/auth';
import {login,logout} from './store/authSlice'
import  {Header}  from './components/Header/Header';
import  {Footer } from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';

function App() {

  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch(); 

  useEffect(() => {
    (async () => {
      try {
        const userData = await authService.getCurrentUser();
        dispatch(login(userData));
      } catch (error) {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  
  return !loading ? (
    <div>
        <Header/>
          <main>
              <Outlet/>
          </main>
        <Footer/>
    </div>
  ) : null;
}

export default App
