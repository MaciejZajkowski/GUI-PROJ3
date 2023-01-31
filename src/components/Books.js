import Book from "./Book"

const Books = ({books,reserve,revoke,accept,decline,curr_username}) => {
    
    
    return (
    <>
    {books.map((book) => ( 
    <Book key={book.id} book = {book} reserve={reserve} 
    revoke = {revoke} decline={ decline} accept={accept}curr_username = {curr_username}/>)
    )}
    </>
  )
}
export default Books