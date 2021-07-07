import React from "react";
import "./App.css";
import Contacts from "./pages/Contacts";
import Navbar from "./components/Navbar";
import { withRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";

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
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
