import { useCallback, useState } from "react";
import * as BooksAPI from '../../Backend/BooksAPI'
import PropTypes from 'prop-types'
const UpdateShelf = (props) => {
    
    const {book,shelf,onBooksUpdate} = props
    const [currentShelf, updateCurrentShelf] = useState('')
    const shelves = [
        { shelfname: "currentlyReading", title : "Currently Reading" },
        { shelfname: "wantToRead", title : "Want to Read" },
        { shelfname: "read", title: "Read" },
        { shelfname: "none", title:"None"}
    ]
    
    const UpdateShelf = useCallback((e) => {
        onBooksUpdate(e)
    }, [onBooksUpdate])

    const handleShelfUpdate = (e) => {
        const newShelf = e.target.value
        let updateResult;
        updateCurrentShelf(newShelf)
        BooksAPI.update(book,newShelf).then((result) => {
            updateResult =result
        })
        UpdateShelf(updateResult)
        
    }

    return(
        <select value={currentShelf} onChange={handleShelfUpdate}>
            <option value="" disabled>
            Move to...
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
}

export default UpdateShelf;