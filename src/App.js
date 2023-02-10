import './App.css';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DetailPage from './pages/Details';
import ListPage from './pages/ListPage';
import Filter from './components/Filter';


function App() {
  const [linkSearch, setlinkSearch] = useState("pokemon/?limit=905&offset=0.");
  const [searchTerm, setSearchTerm] = useState("");
  const [Lang, setLang] = useState("English");
  const [DL, setDL] = useState("Light");
  const [Burger, setBurger] = useState("Lpk");
  const [el] = useState(document.getElementsByClassName('map_div'));
  const [darkMode, setDarkmode] = useState(false);
  const [loading, setLoading] = useState(false);

  function searchByFilter(filter = "pokemon/?limit=905&offset=0.", target) {
    let buttons = document.querySelectorAll("button");

    Array.from(buttons).forEach((but) => {
      but.classList.remove("selected");
    });
    target.classList.add("selected");
    setlinkSearch(filter);
  }

  function searchPokemon(searchTerm) {
    setSearchTerm(searchTerm);
  }

  function reset() {
    setlinkSearch("pokemon/?limit=905&offset=0.");
    setSearchTerm("");
    document.getElementById("searchInput").value = "";
  }

  function selectLang() {
    if (Lang === "German") {
      setLang("English");
    }
    if (Lang === "English") {
      setLang("German");
    }
  }

  useEffect((load) => {
    if (darkMode) {
      document.body.className = "dark";
      Array.from(el).forEach((element) => {
        // element.style.background = "linear-gradient(52.41deg, #BFDFFF 4.87%, #001224 94.37%)";
        element.classList.add("darkM");
        element.classList.remove("LightM");
      });
      setDL("Dark");
      setBurger("Dpk");
    } else {
      setDL("Light");
      setBurger("Lpk");
      document.body.className = "light";
      Array.from(el).forEach((element) => {
        // element.style.background = "linear-gradient(52.41deg, #FFE1C6 4.87%, #FFCB05 94.37%)";
        element.classList.remove("darkM");
        element.classList.add("LightM");
      });

    }
    setLoading(false);
  }, [darkMode, loading, el]);

  const toggleTheme = () => {
    setDarkmode(!darkMode);
  };

  const toggleLoad = () => {
    setLoading(true);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<><Header setDarkmode={toggleTheme} setLanguage={selectLang} filter={searchByFilter} search={searchPokemon} resetButton={reset} /> <ListPage loading={toggleLoad} language={Lang} searchTerm={searchTerm} searchLink={linkSearch} /></>} />
          <Route path="/:pokemon/:id" element={<><Header setDarkmode={toggleTheme} burgerimg={Burger} dlimg={DL} setLanguage={selectLang} search={searchPokemon} resetButton={reset} /><DetailPage language={Lang} /></>} />
          <Route path="/filter" element={<Filter filter={searchByFilter} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;