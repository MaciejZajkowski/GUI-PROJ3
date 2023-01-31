const Book = ({book,revoke,reserve,accept,decline,curr_username}) => {
  if (curr_username !== 'librarian'){
      var button1 = <button onClick = {() =>reserve(book.id)}> Reserve </button>;
            
      var button2 = <button onClick = {() =>revoke(book.id)} > Revoke </button>;

  }
  else{
    var button1 = <button onClick = {() =>accept(book.id)}> Accept </button>
            
    var button2 = <button onClick = {() =>decline(book.id)}> Decline </button>
  }
  return (
    <div className="book">
        <h3>
            {book.title}
            {button1}
            {button2}
        </h3>
        <p>{book.author}</p>
        <p>{book.publisher}</p>
        <p>{book.date}</p>
        <p>{book.user}</p>
        <p>leased: {String(book.leased)}</p>
        
    </div>
  )
}

export default Book