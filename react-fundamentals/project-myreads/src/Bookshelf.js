import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {
  state = {
    books: []
  }
  render () {
    const { books } = this.state
    const { title } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { books.length
              ? books.map(book => <li><Book /></li>)
              : "No books in this shelf yet."
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
