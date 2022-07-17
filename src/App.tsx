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
        <Route path="deck" element={<Deck />}>
          <Route path=":deckId" element={<Deck />} />
        </Route>
        <Route path="flashcard" element={<Flashcard />} />
        <Route path="logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
