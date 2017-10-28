import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
    const {
      contacts,
      onRemoveContact
    } = this.props
    return (
      <div className="list-contacts">
        <input
          type="text"
          className="search-contacts"
          placeholder="Search contacts"
          value={this.state.query}
          onChange={(event) => this.updateQuery(event.target.value)}
        />
        <ol className="contact-list">
          {contacts.map(contact =>
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
