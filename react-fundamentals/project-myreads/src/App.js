import React, { Component } from 'react'
import ListBooks from './ListBooks'
import Search from './Search'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {

  render() {
    return (
      <div>
        <Route exact path="/" component={ListBooks} />
        <Route exact path="/search" component={Search} />
      </div>
    )
  }
}


export default BooksApp
