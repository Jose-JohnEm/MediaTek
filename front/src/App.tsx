import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// import NotFoundPage from './pages/NotFoundPage'
import Header from './components/header'
import HomePage from './pages/homePage'
import NewsPage from './pages/newsPage'
import AccountPage from './pages/accountPage'
import SigninPage from './pages/signinPage'
import UploadPage from './pages/uploadPage'
import ValidationPage from './pages/validationPage'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignupPage from './pages/signupPage';

const theme = createTheme({
  typography: {
    'fontFamily': 'Quicksand'
  },
});

function App() {
  return (

    <div className="App">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&family=Quicksand&family=Spartan:wght@200&display=swap');
      </style>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={ <HomePage/> }/>
            <Route path="/news" element={ <NewsPage param=''/> }/>
            <Route path="/news/me" element={ <NewsPage param='/me'/> }/>
            <Route path="/news/liked" element={ <NewsPage param='/liked'/> }/>
            <Route path="/news/saved" element={ <NewsPage param='/saved'/> }/>
            <Route path="/upload" element={ <UploadPage/> }/>
            <Route path="/account" element={ <AccountPage/> }/>
            <Route path="/signin" element={ <SigninPage/> }/>
            <Route path="/validation" element={ <ValidationPage/> }/>
            <Route path="/signup" element={ <SignupPage/> }/>

          </Routes>

        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
