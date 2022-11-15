import PropTypes from 'prop-types'
import Swal from 'sweetalert2'
import { BooksView } from '../../Views/Book/Book'


const Book = (props) => {
    const {book,setBooks,books,shelves,setMounted,Mounted} = props
    const BookImage = book.imageLinks ? book.imageLinks.thumbnail : `https://dummyimage.com/128x193/ff4000/fcfc7e.png&text=${book.title.split(' ').join('+')}`
    const BookView = (book) => {
        
        const BookModal = Swal.mixin({
            showCloseButton: true,
            closeButtonHtml: `<span class="book-view-close">&times;</span>`,
            background:`linear-gradient(rgb(243, 191, 148),rgb(243, 221, 174),rgb(243, 191, 148))`,
            html:
                `<div class="book-view-grid">
                    <div class="book-view-pic">
                        <img class="book-displied-pic" src=${BookImage} alt=${book.title} />
                    </div>
                    <span class="book-view-booklink"><a href=${book.previewLink} target="_blank">Preview</a></span>
                    <div class="book-view-pages">Number of pages: <span class="book-view-pagecount">${book.pageCount}</span></div>
                    <hr style="opacity:0.1;">
                    <div class="book-view-desc">Description</div>
                    <div class="book-view-descval">${book.description}</div>
                    <hr style="opacity:0.1;">
                    <div class="book-view-authors">Authors: 
                        <span class="book-view-authval">${book.authors? book.authors.map((auth) => '<h5 style="width:max-content;display:inline">'+auth+'</h5>').toString().replaceAll(',','  ') : "Unknown"}</span>
                    </div>
                    
                    
                    
                </div>`,
            showConfirmButton:false,
            
        })
        BookModal.fire({
            title:`${book.title}`,
        })
    }

    return (
        <BooksView BookView={BookView} book={book} setBooks={setBooks} books={books} shelves={shelves} setMounted={setMounted} Mounted={Mounted} />
    )
}
Book.propTypes = {
    onBooksUpdate: PropTypes.func,
    book: PropTypes.object,
    Shelf: PropTypes.string
}
export default Book;