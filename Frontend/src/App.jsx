// frontend/src/App.jsx
import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import { StoreProvider, StoreContext } from './store/StoreContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './App.css'; // Import the new CSS
import ReportsPage from './pages/ReportsPage.jsx';
import LeadsGeneration from './pages/LeadsGeneration.jsx';
import LeadManager     from './pages/LeadManager.jsx';  


function Navbar() {
  const { user, signOut, isLoading, isValidating } = useContext(StoreContext);
  const navigate = useNavigate();

  function signUserOut() {
    signOut();
    navigate('/signin');
  }

  const userInitial = user && user.firstName ? user.firstName[0] : user && user.email ? user.email[0] : null;

  // While loading/validating, you can show a spinner or skeleton here
  if (isLoading || isValidating) {
    return (
      <div className='navbar'>
        <div className='nav-left'>
          <img
            className='university-icon'
            src='https://www.sce.ac.il/ver/14/tpl/website/img/SamiSH-logo_2.png'
            alt='University Icon'
          />
        </div>
        <div className='nav-right'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='navbar'>
      <div className='nav-left'>
        <img
          className='university-icon'
          src='https://www.sce.ac.il/ver/14/tpl/website/img/SamiSH-logo_2.png'
          alt='University Icon'
        />
      </div>

      <div className='nav-right'>
        <div className='nav-links'>
          <Link to='/'>Home</Link>
          {!user ? (
             <div className='nav-links'>
               <Link to='/signin'>Sign In</Link>
               <Link to='/signup'>Sign Up</Link>
              <Link to='/createlead'>Leads Generation</Link>

             </div>
           ) : (
             <a onClick={signUserOut}>Sign out</a>
           )}
        </div>
        {user && <div className='user-circle'>{userInitial}</div>}
      </div>
    </div>
  );
}

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Navbar />
        <div style={{ backgroundImage: 'url(/background.png)'  }}>
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route path='/signin' element={<SignInPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route
              path='/reports'
              element={
                <ProtectedRoute>
                  <ReportsPage />
                </ProtectedRoute>
              }
            />
            <Route path='/createlead' element={<LeadsGeneration />} />
            <Route path="/lead-manager" element={<LeadManager />} />
            <Route
              path='/products'
              element={
                <ProtectedRoute>
                  <ProductsPage />
                </ProtectedRoute>
              }
            />
          </Routes>

        </div>
        
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
