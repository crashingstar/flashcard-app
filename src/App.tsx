
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Deck from './component/DeckComponent';
import Home from './component/HomeComponent';
import Login from './pages/LoginComponent';
import Register from './pages/RegisterComponent';
import Flashcard from './component/FlashcardComponent';
import NavBarComponent from "./component/NavBarComponent";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    containerLogin: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    
    headerLogin: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    cardLogin: {
      marginTop: theme.spacing(10)
    }
  })
);


function App() {
  return (
    <div>
    <NavBarComponent></NavBarComponent>

    <BrowserRouter>

      <Routes>
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route path="home" element={<Home/>} />
        <Route path="deck" element={<Deck/>} />
        <Route path="flashcard" element={<Flashcard/>} />
      </Routes>
    </BrowserRouter>
    </div>
    );
}

export default App;
