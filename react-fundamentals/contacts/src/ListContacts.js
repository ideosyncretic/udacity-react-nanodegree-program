import React from 'react'
import PropTypes from 'prop-types'

const ListContacts = ({ contacts, onRemoveContact }) => {
  return (
    <ol className="contact-list">
      {contacts.map(contact =>
        <li key={contact.id} className="contact-list-item">
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

ListContacts.PropTypes = {
  contacts: PropTypes.array.irRequired,
  onRemoveContact: PropTypes.func.isRequired
}

export default ListContacts
