import Navbar from './header/Navbar';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/dashboard/Home';
import Contact from './pages/Contact';
import MarketOverview from './pages/dashboard/MarketOverview';
import Subscription from './pages/subscription/Subscription';
import Wallet from './pages/wallet/Wallet';
import User from './pages/user/User';
import Profile from './pages/profile/Profile';
import Footer from './header/Footer';
import Subscriptionadminhome from './pages/admin/batch/Subscriptionadminhome';
import SignUp from './pages/user/signup';
import Batch from './pages/admin/batch/Batch';
import Logs from "./pages/admin/Logs";
import {setAuthToken} from "./pages/user/AuthToken";
import { AuthProvider } from './contexts/AuthContext';
import ForgotPassword from './pages/user/ForgotPassword';
import Login from './pages/user/Login';

function App() {
    //check jwt token
    const token = localStorage.getItem("token");
    if (token) {
        setAuthToken(token);
    }
  return (
    <AuthProvider>
      <div className="App bg-rose-400	  w-full h-screen" >
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/markets' element={<MarketOverview />} />
          <Route path='/subscription' element={<Subscription />} />
          <Route path='/Subscriptionadminhome' element={<Subscriptionadminhome />} />
          <Route path='/wallet' element={<Wallet />} />
          <Route path='/user' element={<User />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="/batch" element={<Batch />} />
          <Route path="/log" element={<Logs />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
