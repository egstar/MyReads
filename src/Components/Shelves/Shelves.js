import Book from "../Book/Book";
import PropTypes from 'prop-types'
import { RotatingLines } from 'react-loader-spinner'

const ShelvesList = (props) => {
    const {Shelf,shelves,books,setBooks,setMounted,Mounted} = props
    return (
        <div className="bookshelf" key={Shelf}>
            <h2 className="bookshelf-title">{shelves.filter(({name}) => name === Shelf.name).map((shelf) => {return (shelf.title)})}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        books.filter(({shelf}) => shelf === Shelf.name).length > 0
                        ? books.filter(({shelf}) => shelf === Shelf.name).map((book) => <Book key={book.id} book={book} Shelf={book.shelf} books={books} setBooks={ setBooks} shelves={shelves} setMounted={ setMounted} Mounted={Mounted}/>)
                        : books.length > 0
                          ? <h3><span style={{color:"red",textDecoration:"underline"}}>{books.filter(({shelf}) => shelf === Shelf.name).length}</span> Books found in this shelf.</h3> 
                          : <RotatingLines
                                strokeColor="darkorange"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="96"
                                visible={true}
                            />
                    }
                </ol>
            </div>
        </div>
    )
}
ShelvesList.propTypes = {
    setBooks: PropTypes.func,
    Shelf: PropTypes.object.isRequired,
    book: PropTypes.objectOf(PropTypes.object),
}
export default ShelvesList;