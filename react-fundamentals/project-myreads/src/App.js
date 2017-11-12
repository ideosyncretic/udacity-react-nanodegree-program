import React, { Component } from 'react'
import ListBooks from './ListBooks'
import Search from './Search'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount () {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  handleUpdate (book, shelf) {
    console.log(book, shelf)
    // BooksAPI.update(book, shelf).then(
    //   response => console.log(response)
    // )
  }

  render() {
    const { books } = this.state
    return (
      <div>
        <Route exact path="/" render={() => <ListBooks books={books} handleUpdate={this.handleUpdate.bind(this)} />} />
        <Route exact path="/search" render={() => <Search handleUpdate={this.handleUpdate.bind(this)} />} />
      </div>
    )
  }
}



export default BooksApp
