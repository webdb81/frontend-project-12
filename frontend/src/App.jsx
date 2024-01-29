import { Route, Routes, BrowserRouter } from 'react-router-dom';
// import { useState } from 'react';
import LoginPage from './pages/LoginPage.jsx';
import NotFound from './pages/NotFoundPage.jsx';
// import Header from './Header.jsx';
import ChatPage from './pages/ChatPage.jsx';
// import AuthContext from '../contexts/index.jsx';

// const AuthProvider = ({ children }) => {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const logIn = () => setLoggedIn(true);
//   const logOut = () => {
//     localStorage.removeItem('userId');
//     setLoggedIn(false);
//   };
//   return (
//     <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

const App = () => (
  <div className="d-flex flex-column h-100">
    {/* <AuthProvider> */}
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
    {/* </AuthProvider> */}
  </div>
);

export default App;
