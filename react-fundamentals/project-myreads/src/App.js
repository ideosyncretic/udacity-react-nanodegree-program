import React, { Component } from 'react'
import ListBooks from './ListBooks'
import Search from './Search'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  handleUpdate (book, shelf) {
    BooksAPI.update(book, shelf).then(
      // TODO update state here
    )
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={() => <ListBooks {...this.state}/>} />
        <Route exact path="/search" component={Search} />
      </div>
    )
  }
}



export default BooksApp
