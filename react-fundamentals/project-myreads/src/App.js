import React, { Component } from 'react'
import ListBooks from './ListBooks'
import Search from './Search'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import find from 'lodash/find'
import matchesProperty from 'lodash/matchesProperty'

class BooksApp extends Component {
  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount () {
    BooksAPI.getAll().then((books) => {
      // get arrays of book objects
      const currentlyReading = books.filter(book => book.shelf === "currentlyReading")
      const wantToRead = books.filter(book => book.shelf === "wantToRead")
      const read = books.filter(book => book.shelf === "read")
      this.setState({
        books,
        currentlyReading,
        wantToRead,
        read
      })
    })
  }

  handleUpdate (book, newShelf) {
    BooksAPI.update(book, newShelf).then(
      (response) => {
        let { currentlyReading, wantToRead, read } = response
        this.setState(prevState => {
          // in each array, convert book IDs to book objects
          currentlyReading = currentlyReading.map(id => find(prevState.books, matchesProperty('id', id)))
          wantToRead = wantToRead.map(id => find(prevState.books, matchesProperty('id', id)))
          read = read.map(id => find(prevState.books, matchesProperty('id', id)))

          // find the book and update the shelf manually
          if (newShelf === "currentlyReading") {
            // get position of book
            const bookIndex = currentlyReading.findIndex(i => i.id === book.id)
            currentlyReading[bookIndex].shelf = newShelf
          }
          if (newShelf === "wantToRead") {
            // get position of book
            const bookIndex = wantToRead.findIndex(i => i.id === book.id)
            wantToRead[bookIndex].shelf = newShelf
          }
          if (newShelf === "read") {
            // get position of book
            const bookIndex = read.findIndex(i => i.id === book.id)
            read[bookIndex].shelf = newShelf
          }

          // return final shelf arrays, one of which has the manually updated book
          return ({
            currentlyReading,
            wantToRead,
            read,
          })
        })
      }
    )
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={() => <ListBooks {...this.state} handleUpdate={this.handleUpdate.bind(this)} />} />
        <Route exact path="/search" render={() => <Search handleUpdate={this.handleUpdate.bind(this)} />} />
      </div>
    )
  }
}



export default BooksApp
