import {  useState } from "react";
import * as BooksAPI from '../../Backend/BooksAPI'
import PropTypes from 'prop-types'

const UpdateShelf = (props) => {
    const {book,Shelf,setBooks,books,shelves,setMounted,Mounted} = props
    const [currentShelf, updateCurrentShelf] = useState(Shelf)
    
    const handleShelfUpdate = (e) => {
        const newShelf = e.target.value
        updateCurrentShelf(newShelf)
        BooksAPI.update(book,newShelf).then(() =>{
            setMounted(!Mounted)
            BooksAPI.getAll().then((Results) => {
                if(books !== Results){
                    setBooks(Results)
                }
            })
        })
    }

    return(
        <select defaultValue={Shelf} onChange={handleShelfUpdate}>
            <option style={{background:"orange",fontWeight:"bold",color:"white",border:"2px solid red"}} value={Shelf} disabled>
            Move from [ {shelves && shelves.filter(({name}) => name === currentShelf).map(({title}) => { return( title ? title : "none" ) })} ]
            </option>
            {
                
                Shelf !== undefined
                ? shelves && shelves.filter(({name}) => name !== Shelf)
                .map(({name,title}) => {
                    return (
                        <option key={name} value={name}>{title}</option>
                    )
                }) 
                : shelves && shelves.filter(({name}) => name !== "none")
                .map(({name,title}) => {
                    return (
                        <option key={name} value={name}>{title}</option>
                    )
                })
                
            }
        </select>
    )
}
UpdateShelf.propTypes = {
    setBooks: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
    Shelf: PropTypes.string
}

export default UpdateShelf;