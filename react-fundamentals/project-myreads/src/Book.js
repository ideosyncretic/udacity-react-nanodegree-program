import React, { Component } from 'react'

class Book extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.book.shelf
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const value = event.target.value
    const book = this.props.book
    this.setState({value})
    this.props.handleUpdate(book, value)
  }

  render () {
    const { value } = this.state
    const { book } = this.props
    const {
      title,
      authors,
      imageLinks
    } = book

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select value={value} onChange={this.handleChange}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.map(author => author)}</div>
      </div>
    )
  }
}

export default Book
