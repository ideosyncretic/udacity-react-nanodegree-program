import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onRemoveContact: PropTypes.func.isRequired
  }
  render () {
    const {
      contacts,
      onRemoveContact
    } = this.props
    return (
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
    )
 }
}

export default ListContacts
