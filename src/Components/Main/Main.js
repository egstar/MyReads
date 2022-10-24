import HomeView from "../../Views/Home/Home";

const MainPage = (props) => {
  const {shelves,books,setBooks,setMounted,Mounted} = props
    return (
        <HomeView 
          Mounted={Mounted}
          setMounted={ setMounted}
          books={books}
          shelves={shelves}
          setBooks={ setBooks}
          />
    )
}

export default MainPage;