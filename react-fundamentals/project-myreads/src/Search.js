import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends Component {
  state = {
    books: []
  }

  // componentDidMount () {
  //   BooksAPI.getAll().then((books) => {
  //     this.setState({ books })
  //   })
  // }

  handleSearch = (query) => {
    if (query.length) {
      BooksAPI.search(query, 20).then(books => this.setState({ books }))
    } else this.setState({ books: [] })
  }

  render () {
    const { books } = this.state
    const { handleUpdate } = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={(e) => {this.handleSearch(e.target.value)}}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {
                books.length
                ? books.map(book => <li key={book.id}><Book  book={book} handleUpdate={handleUpdate} /></li>)
                : "*twiddles thumbs*"
              }
            </ol>
          </div>
        </div>
      )
  }
}

export default Search
