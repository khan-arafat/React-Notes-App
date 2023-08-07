import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Notes from './pages/Notes';
import Create from './pages/Create';
import { createTheme, ThemeProvider } from '@mui/material';
import { orange } from '@mui/material/colors';
import Layout from './components/Layout';

const theme = createTheme({
  palette: {
    primary: {
      main: "#fefefe"
    },
    secondary:orange
  },
  typography: {
    fontFamily: 'Open Sans',
    fontWeightLight:400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})
function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
      <Layout>
      <Routes>
        <Route exact path="/" element={<Notes />}>
        </Route>
        <Route path="/create" element={<Create />}>
        </Route>
      </Routes>
      </Layout>
    </ThemeProvider>
    </div>
  );
}

export default App;
