import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {
  render () {
    const { title, books, handleUpdate } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { books.length
              ? books.map(book => <li key={book.id}><Book book={book} handleUpdate={handleUpdate} /></li>)
              : null
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
