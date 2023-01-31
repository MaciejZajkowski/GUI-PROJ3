import Header from './components/Header'
import Books from './components/Books';
import { useState,useEffect } from "react"
import L_R from './components/L_R';
import axios from 'axios';

var curr_username = '-';
var url_users = "http://localhost:5001/users";
var url_books = "http://localhost:5001/books";
function App() {
  const [books,setBooks] = useState([])

  const [users,setUsers] = useState([])

  useEffect(() => {
    const getBooks = async () => {
      const tasksFromServer = await fetchBooks()
      setBooks(tasksFromServer)
    }

    getBooks()
  }, [])

  const getBooks = async () => {
    const tasksFromServer = await fetchBooks()
    setBooks(tasksFromServer)
  }

  const getUsers = async () => {
    const tasksFromServer = await fetchUsers()
    setUsers(tasksFromServer)
  }

  const find_user_id = ()=>{
    console.log('find_user_id')
    console.log({"username":curr_username})
    var rv = -1;
    const _ = users.map((user,i) => {
      if (user.login === curr_username){
        console.log({"user login": user.login})
        console.log({"user id": i})
        rv = user.id;
      }

    });
    return rv
  };

  const fetchBooks = async () => {
    const res = await fetch(url_books)
    const data = await res.json()

    return data
  }

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:5001/users')
    const data = await res.json()

    return data
  }

  useEffect(() => {
    const getUsers = async () => {
      const tasksFromServer = await fetchUsers()
      setUsers(tasksFromServer)
    }

    getUsers()
  }, [])

  const register = (user) =>{
    console.log("register")

    const found2 = users.some(el => el.login === user.login && el.pwd === user.pwd);
    const found = users.some(el => el.login === user.login);
    console.log({"correct login and pwd:":found2})
    console.log({"correct login":found})
    if (!found2 && found){
      //wrong password
      curr_username ='-'
      alert("WRONG PASSWORD!")
  }
    else{
      if (!found){
        axios.post(url_users,user);
        curr_username = user.login
      }
      if(found2){
        curr_username = user.login
      }
    }
    
    console.log({curr_username})
    refresh()
  }

  const logout = () =>{
    console.log({"logging out": curr_username})
    curr_username = '-'
    refresh()
  }

  const del_account = async () =>{

    console.log({"del account":curr_username})
    if (curr_username === '-' || curr_username === 'librarian'){
      alert('you cannot delete account')
      return 0;
    }

    books.map((book, i) => {
      //console.log({i,id})
      if (book.user=== curr_username) {
        return 0;
      } 
    });
    
    var id = find_user_id();

    console.log({"sending request to delete: ":curr_username})
    await axios.delete(`${url_users}/${id}`);
    
    logout();

  }

  const modify_book = (book) =>{
    axios.put(`${url_books}/${book.id}`,book);
  }

  const accept = (id) =>{
    if (curr_username !== 'librarian'){
      alert('you need to be librarian')
      return 0;
    }
    console.log('accept')

    books.map((book, i) => {
      //console.log({i,id})
      if (i=== id && book.user !== '-') {
        book.leased = true
        modify_book(book)
      }
    });
    refresh()
  }

  const decline = (id) =>{
    if (curr_username !== 'librarian'){
      alert('you need to be librarian')
      return 0;
    }
    console.log('decline')

    const newBooks = books.map((book, i) => {
      //console.log({i,id})
      if (i=== id) {
        book.user = '-'
        book.leased = false
        modify_book(book)
      } 
    });
    getBooks();

  }
  const revoke = (id) =>{

    if (curr_username === '-'){
      alert('you need to be logged in')
      return 0;
    }
    console.log('revoke')
    books.map((book, i) => {
      //console.log({i,id})
      if (i=== id && book.user === curr_username) {
        book.user = '-'
        book.leased = false
        modify_book(book)
      }
    });
    getBooks();
  }
  const reserv = (id)=>{
    if (curr_username === '-'){
      return 0;
    }

    console.log('reserve')
    //updating
    books.map((book, i) => {
      //console.log({i,id})
      if (i=== id && book.user === '-') {
        console.log('reserved')
        book.user = curr_username
        console.log(curr_username)
        modify_book(book)
      }
    });
    getBooks();
  };

  const refresh = ()=>{
    getBooks();
    getUsers();
  };

  return (
    
    <div className= "cointainer">
      <h1> hello {curr_username} in Library</h1>
      <h2>
        <button onClick = {del_account}> Delete Account</button>
        <button onClick = {logout} color='red'> logout</button>
        <button onClick = {refresh} color='red'> Refresh</button>
      </h2>
      <L_R onRegister={register}/>
      <Books books={books} reserve={reserv} accept={accept}decline={decline} revoke={revoke} curr_username={curr_username}/>
      
    </div>
  );
}

export default App;
