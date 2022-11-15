import UpdateShelf from '../../Components/Shelves/ShelfUpdate'


export const BooksView = (props) => {

    const {book,setBooks,books,shelves,setMounted,Mounted,BookView} = props

    return(
        <li className={`listedBook`} key={book.id}>
            <span className="tooltip-text">{book.title}</span>
            <div className="book">
                <div className="book-top">
                    <div
                    className="book-cover" onClick={ () => BookView(book)}
                    style={{
                        width: "100%",
                        height:193,
                        backgroundImage:
                        book.imageLinks ? `url(${ book.imageLinks.thumbnail })`: `url(https://dummyimage.com/128x193/ff4000/fcfc7e.png&text=${book.title.split(' ').join('+')})`,
                    }}
                    ></div>
                    <div className="book-shelf-changer">
                        <UpdateShelf 
                            key={book.id} 
                            book={book} 
                            books={books}
                            Shelf={book.shelf ? book.shelf : books.filter(({id}) => id === book.id).length > 0 ? books.filter(({id}) => id === book.id).map((thisbook) => { return thisbook.shelf} ).toString() : "none"} 
                            shelves={shelves}
                            setBooks={ setBooks}
                            setMounted={ setMounted}
                            Mounted={Mounted}
                        />
                    </div>
                </div>
                <div className="book-authors">
                    {
                        book.authors && book.authors.length > 0
                        ? <div className="author-name" key={ book.title + book.authors[0] } >{ book.authors[book.authors.length-1] }</div>
                        : <div className="author-name" key={ book.title + "Unknown" } >{ "Unknown" }</div>
                    }
                    
                </div>
            </div>
        </li>
    )

}