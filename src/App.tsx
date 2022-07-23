import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Deck from "./pages/DeckComponent";
import Home from "./pages/HomeComponent";
import Login from "./pages/LoginComponent";
import Register from "./pages/RegisterComponent";
import Flashcard from "./pages/FlashcardComponent";
import NavBarComponent from "./component/NavBarComponent";
import Logout from "./pages/LogoutComponent";

function App() {
  return (
    <BrowserRouter>
      <NavBarComponent />

      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<Home />} />
        <Route path="deck">
          <Route path=":deckId" element={<Deck />} />
          <Route path="review">
            <Route path=":deckId" element={<Flashcard />} />
          </Route>
        </Route>
        <Route path="logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
