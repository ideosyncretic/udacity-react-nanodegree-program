import React, { Component } from 'react'
import ListBooks from './ListBooks'
import Search from './Search'
import { Route } from 'react-router-dom'
import {
  SHELF_CURRENTLY_READING,
  SHELF_WANT_TO_READ,
  SHELF_READ,
  SHELF_NONE
} from './constants'
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

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      // get arrays of book objects
      const currentlyReading = books.filter(
        book => book.shelf === SHELF_CURRENTLY_READING
      )
      const wantToRead = books.filter(book => book.shelf === SHELF_WANT_TO_READ)
      const read = books.filter(book => book.shelf === SHELF_READ)
      this.setState({
        books,
        currentlyReading,
        wantToRead,
        read
      })
    })
  }

  mapIdToBook = (shelf, booksWithShelves, book) => {
    return shelf.map(id => {
      let bookObject = find(booksWithShelves, matchesProperty('id', id))
      // if this book is newly added
      if (!bookObject) {
        bookObject = book
      }
      return bookObject
    })
  }

  handleUpdate = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(response => {
      let { currentlyReading, wantToRead, read } = response
      this.setState(prevState => {
        // convert book IDs to book objects
        currentlyReading = this.mapIdToBook(
          currentlyReading,
          prevState.books,
          book
        )
        wantToRead = this.mapIdToBook(wantToRead, prevState.books, book)
        read = this.mapIdToBook(read, prevState.books, book)

        // find the book in shelf, and update the shelf property manually
        if (newShelf === SHELF_CURRENTLY_READING) {
          const bookIndex = currentlyReading.findIndex(i => i.id === book.id)
          currentlyReading[bookIndex].shelf = newShelf
        }
        if (newShelf === SHELF_WANT_TO_READ) {
          const bookIndex = wantToRead.findIndex(i => i.id === book.id)
          wantToRead[bookIndex].shelf = newShelf
        }
        if (newShelf === SHELF_READ) {
          const bookIndex = read.findIndex(i => i.id === book.id)
          read[bookIndex].shelf = newShelf
        }

        // return final shelf arrays, one of which has the manually updated book
        return {
          books: [...currentlyReading, ...wantToRead, ...read],
          currentlyReading,
          wantToRead,
          read
        }
      })
    })
  }

  checkShelf = bookId => {
    const { currentlyReading, wantToRead, read } = this.state
    const isCurrentlyReading = find(
      currentlyReading,
      book => book.id === bookId
    )
    const isWantToRead = find(wantToRead, book => book.id === bookId)
    const isRead = find(read, book => book.id === bookId)

    if (isCurrentlyReading) {
      return SHELF_CURRENTLY_READING
    }
    if (isWantToRead) {
      return SHELF_WANT_TO_READ
    }
    if (isRead) {
      return SHELF_READ
    }
    return SHELF_NONE
  }

  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              {...this.state}
              checkShelf={this.checkShelf}
              handleUpdate={this.handleUpdate}
            />
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <Search
              checkShelf={this.checkShelf}
              {...this.state}
              handleUpdate={this.handleUpdate}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
