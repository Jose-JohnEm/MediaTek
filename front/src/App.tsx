import React from 'react';

// import NotFoundPage from './pages/NotFoundPage'
// import Header from './components/Header'
import HomePage from './pages/homePage'
import NewsPage from './pages/newsPage'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

const theme = createTheme({
  typography: {
    'fontFamily': 'Open Sans'
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={ <HomePage/> }/>
          <Route path="/news" element={ <NewsPage/> }/>
          <Route path="/upload" element={ <NewsPage/> }/>
          <Route path="/account" element={ <NewsPage/> }/>
          <Route path="/signin" element={ <NewsPage/> }/>
          <Route path="/signin" element={ <NewsPage/> }/>

        </Routes>
      
      </BrowserRouter>
    </ThemeProvider>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
