import React from "react";
import "./App.css";
import Contacts from "./pages/Contacts";
import Navbar from "./components/Navbar";
import { withRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddContact from "./pages/AddContact";

class App extends React.Component {
  state = {
    contacts: [],
    error_message: null,
  };

  async componentDidMount() {
    const response = await fetch("http://localhost:8000/contacts");
    const result = await response.json();
    if (result.success) {
      const contacts = result.result;
      this.setState({ contacts });
    } else {
      this.setState({ error_message: response.message });
    }
  }

  deleteContact = async (id) => {
    console.log(id);
    try {
      const response = await fetch(`http://localhost:8000/contact?id=${id}`, {
        method: "DELETE",
      });
      const results = await response.json();
      if (results.success) {
        // remove the user from the current list of users
        const contacts = this.state.contacts.filter(
          (contact) => contact.id !== id
        );
        this.setState({ contacts });
      } else {
        this.setState({ error_message: results.message });
      }
    } catch (e) {
      console.log(e);
    }
  };

  addContact = async (blah) => {
    try {
      const body = new FormData();
      body.append("image", blah.image);
      const response = await fetch(
        `http://localhost:8000/contact?name=${blah.name}&email=${blah.email}`,
        {
          method: "POST",
          body,
        }
      );
      const results = await response.json();
      if (results.success) {
        // remove the user from the current list of users
        /*  const contacts = this.state.contacts.filter(
          (contact) => contact.id !== id
        );
        this.setState({ contacts }); */
        const contacts = [
          ...this.state.contacts,
          {
            id: results.result.id,
            name: blah.name,
            email: blah.email,
            image: results.result.image,
          },
        ];
        this.setState({ contacts });
      } else {
        this.setState({ error_message: results.message });
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route path="/contacts" component={Contacts} /> */}
          <Route
            path="/contacts"
            render={(props) => (
              <Contacts
                contacts={this.state.contacts}
                deleteContact={this.deleteContact}
                {...props}
              />
            )}
          />
          <Route
            path="/addcontact"
            render={(props) => (
              <AddContact addContact={this.addContact} {...props} />
            )}
          />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
