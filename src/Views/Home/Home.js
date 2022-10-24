import { Link } from "react-router-dom";
import ShelvesList from "../../Components/Shelves/Shelves";

const HomeView = (props) => {
    const {Mounted,setMounted,books,shelves,setBooks} = props
    

    return(
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              { shelves
                .filter(({name}) => name !== "none")
                .map((Shelf) =>
                    <ShelvesList
                    key={Shelf.name}
                    Mounted={Mounted}
                    setMounted={ setMounted}
                    books={books}
                    shelves={shelves}
                    Shelf={Shelf}
                    setBooks={setBooks}
                    />
                )
              }
            </div>
          </div>
          <div className="open-search">
            <Link to={`/search`} >Add a book</Link>
          </div>
        </div>
    )
}
export default HomeView;