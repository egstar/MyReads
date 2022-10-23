import { Link } from "react-router-dom";
import ShelvesList from "../Shelves/Shelves";

const MainPage = () => {
  const Shelves = [
    "currentlyReading",
    "wantToRead",
    "read"
  ]
    return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {Shelves.map((Shelf) => <ShelvesList key={Shelf} Shelf={Shelf} />)}
            </div>
          </div>
          <div className="open-search">
            <Link to={`/search/`}>Add a book</Link>
          </div>
        </div>
    )
}

export default MainPage;