import "../../Utilities/Styles/App.css";
import React, { useState } from "react";
import SearchBar from "../Search/Search";
import MainPage from "../Main/Main";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);

  return (
    <div className="app">
      {showSearchPage ? (
        <SearchBar setShowSearchpage={setShowSearchpage} />
      ) : (
        <MainPage setShowSearchpage={setShowSearchpage}/>
      )}
    </div>
  );
}

export default App;
