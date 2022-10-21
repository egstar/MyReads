
import ShelvesList from "../Shelves/Shelves";


const MainPage = ({setShowSearchpage}) => {
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
            <a href="#add" onClick={ () => {setShowSearchpage(true)}}>Add a book</a>
          </div>
        </div>
    )
}

export default MainPage;