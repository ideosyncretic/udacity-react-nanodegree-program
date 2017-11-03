import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
  state = {
    contacts: []
  }
  componentDidMount () {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }
  removeContact = (contactToRemove) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== contactToRemove.id)
    }))

    ContactsAPI.remove(contactToRemove) // use API to remove from DB
  }
  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <ListContacts
            onRemoveContact={this.removeContact}
            contacts={this.state.contacts}
          />
        )} />
        <Route path="/create" component={CreateContact} />
      </div>
    )
  }
}

export default App;
