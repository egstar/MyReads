import ShelfUpdate from '../Shelves/ShelfUpdate'
import PropTypes from 'prop-types'

const Book = (props) => {
    const {book,shelf, setBooks,Books} = props
    
    return(
        <li className={`listedBook`} key={book.id}>
            <span className="tooltip-text">{book.title}</span>
            <div className="book">
                <div className="book-top">
                    <div
                    className="book-cover"
                    style={{
                        width: "100%",
                        height:193,
                        backgroundImage:
                        book.imageLinks ? `url(${ book.imageLinks.thumbnail })`: `url(https://dummyimage.com/128x193/ff4000/fcfc7e.png&text=${book.title.split(' ').join('+')})`,
                    }}
                    ></div>
                    <div className="book-shelf-changer">
                        <ShelfUpdate 
                            key={book.id} 
                            book={book} 
                            shelf={shelf} 
                            setBooks={() => setBooks}
                            Books={Books}
                        />
                    </div>
                </div>
                <div className="book-authors">
                    {
                        book.authors && book.authors.length > 0
                        ? <div className="author-name" key={ book.title + book.authors[0] } >{ book.authors[book.authors.length-1] }</div>
                        : <div className="author-name" key={ book.title + "unknown" } >{ "unknown" }</div>
                    }
                    
                </div>
            </div>
        </li>
    )
}
Book.propTypes = {
    onBooksUpdate: PropTypes.func,
    book: PropTypes.object,
    shelf: PropTypes.string
}
export default Book;