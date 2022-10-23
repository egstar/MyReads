import { useState } from "react";
import * as BooksAPI from '../../Backend/BooksAPI'
import PropTypes from 'prop-types'

const UpdateShelf = (props) => {
    const {book,shelf,setBooks,Books} = props
    const [currentShelf, updateCurrentShelf] = useState(shelf)
    const shelves = [
        { shelfname: "currentlyReading", title : "Currently Reading" },
        { shelfname: "wantToRead", title : "Want to Read" },
        { shelfname: "read", title: "Read" },
        { shelfname: "none", title:"None"}
    ]
    const handleShelfUpdate = (e) => {
        const newShelf = e.target.value
        updateCurrentShelf(newShelf)
        BooksAPI.update(book,newShelf)
        BooksAPI.getAll().then((Results) => {
            if(Books !== Results){
                setBooks(Results)
            }
        }
        )
    
    }

    return(
        <select defaultValue={currentShelf} onChange={handleShelfUpdate}>
            <option style={{background:"orange",fontWeight:"bold",color:"white",border:"2px solid red"}} value={book.shelf} disabled>
            Move from [ {shelves.filter(({shelfname}) => shelfname === currentShelf).map(({title}) => { return( title ) })} ]
            </option>
            {
                shelf !== undefined
                ? shelves.filter(({shelfname}) => shelfname !== shelf)
                .map(({shelfname,title}) => {
                    return (
                        <option key={shelfname} value={shelfname}>{title}</option>
                    )
                })
                : shelves.filter(({shelfname}) => shelfname !== "none")
                .map(({shelfname,title}) => {
                    return (
                        <option key={shelfname} value={shelfname}>{title}</option>
                    )
                })
                
            }
        </select>
    )
}
UpdateShelf.propTypes = {
    onBooksUpdate: PropTypes.func,
    book: PropTypes.object,
    shelf: PropTypes.string
}

export default UpdateShelf;