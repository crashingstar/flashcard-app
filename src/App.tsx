import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DeckComponent } from "./component/shared/Deck";
import EditDeck from "./pages/EditDeckComponent";
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
          <Route path=":deckId" element={<DeckComponent />} />
          <Route path="review">
            <Route path=":deckId" element={<Flashcard />} />
          </Route>
          <Route path="edit">
            <Route path=":deckId" element={<EditDeck />} />
          </Route>
        </Route>
        <Route path="logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
