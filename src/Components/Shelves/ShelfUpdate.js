import { useState } from "react";
import * as BooksAPI from '../../Backend/BooksAPI'
const UpdateShelf = ({book,shelf}) => {
    const [currentShelf, updateCurrentShelf] = useState('')
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


export default UpdateShelf;