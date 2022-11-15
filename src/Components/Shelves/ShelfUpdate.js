import {  useState } from "react";
import * as BooksAPI from '../../Backend/BooksAPI'
import PropTypes from 'prop-types'
import Swal from "sweetalert2";

const alertBox = Swal.mixin({
    showConfirmButton: false,
    timer: 5000,
    background:'linear-gradient(rgb(243, 191, 148),rgb(243, 221, 174),rgb(243, 191, 148))',
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

const UpdateShelf = (props) => {
    const {book,Shelf,setBooks,books,shelves,setMounted,Mounted} = props
    const [currentShelf, updateCurrentShelf] = useState(Shelf)
    
    const handleShelfUpdate = (e) => {
        const newShelf = e.target.value
        updateCurrentShelf(newShelf)
        book.shelf = newShelf;
        if(Shelf !== newShelf){
            alertBox.fire({
                title:"Success",
                icon: "success",
                html:
                `<div class="toast-book-title">${book.title}</div> has been moved to <span class="toast-shelf"> ${shelves.filter((shelf) => shelf.name === newShelf).map((shelf) => shelf.title)} </span> shelf.`,
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            alertBox.fire({
                title:"Error",
                icon: "error",
                html:
                `${book.title} is currently on ${newShelf} shelf`,
            })
        }
        setBooks((books)=> {
            return books.filter((thisBook) => thisBook.id !== book.id).concat([book])
        })
        BooksAPI.update(book,newShelf).then(() =>{
            BooksAPI.getAll().then((Results) => {
                if(books !== Results){
                    setBooks(Results)
                    setMounted(!Mounted)
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