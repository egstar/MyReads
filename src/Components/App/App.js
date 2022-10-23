import  {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import MainPage from "../Main/Main";
import SearchBar from "../Search/Search";
import Index from "../Main/Index";

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<MainPage />} />
          <Route path="/search" element={<SearchBar />} />
        </Route>
      </Routes>
    </Router>
    
  );
}
export default App;
