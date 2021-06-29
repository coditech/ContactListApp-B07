import logo from './logo.svg';
import React from 'react'
import './App.css';

class App extends React.Component {
  state={
    contacts:[]
  }

  async componentDidMount(){
    const response = await fetch('http://localhost:8000/contacts');
    const contacts = await response.json();
    //console.log(data);
    this.setState({contacts})
  }
  render(){
  return (
    <div className="App">
     <ul>
       {
         this.state.contacts.map(contact=><li>{contact.name}</li>)
       }
     </ul>
    </div>
  );
  }
}

export default App;
