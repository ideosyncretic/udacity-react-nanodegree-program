import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'

class ListBooks extends Component {
  render() {
    const {
      handleUpdate,
      checkShelf,
      currentlyReading,
      wantToRead,
      read
    } = this.props
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              title="Currently Reading"
              books={currentlyReading}
              handleUpdate={handleUpdate}
              checkShelf={checkShelf}
            />
            <Bookshelf
              title="Want to Read"
              books={wantToRead}
              handleUpdate={handleUpdate}
              checkShelf={checkShelf}
            />
            <Bookshelf
              title="Read"
              books={read}
              handleUpdate={handleUpdate}
              checkShelf={checkShelf}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
