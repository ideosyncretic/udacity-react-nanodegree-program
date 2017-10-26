import React, { Component } from "react"

class ContactList extends Component {
  render() {
    const people = this.props.contacts
    return (
      <ol>
        {people.map(({ name }) => {
          return <li key={name}>{name}</li>
        })}
      </ol>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <ContactList
          contacts={[
            { name: "Brienne" },
            { name: "Tormund" },
            { name: "Davos" }]}
        />
      </div>
    )
  }
}

export default App
