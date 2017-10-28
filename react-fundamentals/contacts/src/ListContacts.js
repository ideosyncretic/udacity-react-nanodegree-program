import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onRemoveContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  render () {
    const { onRemoveContact } = this.props
    const { query } = this.state

    let showingContacts
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i') // the escape is to treat special characters as normal strings instead of regex helpers, 'i' means not case sensitive
      showingContacts = this.props.contacts.filter((contact) =>   match.test(contact.name)
      )
    } else {
      showingContacts = this.props.contacts
    }

    showingContacts.sort(sortBy('name'))

    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            type="text"
            className="search-contacts"
            placeholder="Search contacts"
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>
        <ol className="contact-list">
          {showingContacts.map(contact =>
            <li
              key={contact.id}
              className="contact-list-item"
            >
              <div
                className="contact-avatar"
                style={{ backgroundImage: `url(${contact.avatarURL})`}}
              />
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button
                className="contact-remove"
                onClick={() => {onRemoveContact(contact)}}
                >
                  Remove
                </button>
              </li>
            )}
        </ol>
      </div>
    )
 }
}

export default ListContacts
