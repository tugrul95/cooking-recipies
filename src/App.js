import { BrowserRouter, Routes, Route } from "react-router-dom";

// Styles
import "./App.css";

// Components
import Navbar from "./components/Navbar";

// Routes
import Home from "./pages/home/Home";
import Create from "./pages/create/Create";
import Search from "./pages/search/Search";
import Recipe from "./pages/recipe/Recipe";
import ThemeSelector from "./components/ThemeSelector";
import useTheme from "./components/hooks/useTheme";

function App() {
  const { nightMode } = useTheme();
  return (
    <div className={`App ${nightMode ? "night-mode" : ""}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/recipes/:id' element={<Recipe />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
