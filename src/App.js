import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import Login from './Login';
import Categories from './Categories';
import Navbar from './components/Navbar'

class App extends Component {
  constructor(){
    super();

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)

    this.state = {
      isLogged: false,
      users: [
        {
          "name": "Admin",
          "role":"admin",
          "email":"admin@admin.com",
          "password":"12345"
        },
        {
          "name": "Heba",
          "role":"user",
          "email":"heba@gmail.com",
          "password":"12345"
        }
      ],
      categories: [
        {
          "id": 80877,
          "name": "Appetizers",
          "items": [
            {
              "id": 132548,
              "name": "French Fries",
              "description": "Custom premium cut by farm frites. Add melted cheese for 7LE - chili con carne for 9LE",
              "price": 54.834
            },
            {
              "id": 655881,
              "name": "Nacho Chips & Salsa",
              "description": "Homemade crispy nacho chips served with fresh salsa dip",
              "price": 54.834
            },
            {
              "id": 655882,
              "name": "Sweet Potato Fries",
              "description": "Served with hot mayo dip",
              "price": 54.834
            },
            {
              "id": 655883,
              "name": "Seasoned Wedges",
              "description": "Served with garlic mayo dip",
              "price": 54.834
            },
            {
              "id": 132565,
              "name": "Chili Cheese Fries",
              "description": "French fries, topped with chili con carne & melted cheddar cheese, served with sour cream and pickled jalapenos",
              "price": 54.834
            },
            {
              "id": 655884,
              "name": "Potato Skins",
              "description": "Loaded with cheese & chili beef ( served with sour cream)",
              "price": 54.834
            },
            {
              "id": 132549,
              "name": "Onion Rings",
              "description": "",
              "price": 54.834
            }
          ]
        },
        {
          "id": 21281,
          "name": "Salads",
          "items": [
            {
              "id": 655880,
              "name": "BLT Salad",
              "description": "Grilled bacon , lettuce , tomatoes with ranch sauce",
              "price": 34.834
            },
            {
              "id": 132570,
              "name": "Caesar Salad",
              "description": "Lettuce, Parmesan cheese, Croutons & Caesar dressing",
              "price": 34.834
            },
            {
              "id": 132574,
              "name": "Garden Salad",
              "description": "Mixed greens and fresh garden selections tossed in vinaigrette dressing",
              "price": 34.834
            },
            {
              "id": 164438,
              "name": "Rocket Mushroom Salad",
              "description": "Rocket leaves, fresh mushrooms, Parmesan cheese, Balsamic dressing",
              "price": 34.834
            }
          ]
        }
      ]
    }
  }

  componentWillMount(){
    this.checkUserStatus()
    this.setDataToStorage()
  }
  // check if user is logged by retrieve data from storage
  checkUserStatus(){
    this.setState({isLogged: localStorage.getItem("isLogged")})
  }
  // store categories, users data in local storage
  setDataToStorage(){
    if(localStorage.getItem('users')==null){
      localStorage.setItem('users',JSON.stringify(this.state.users))
    }
    if(localStorage.getItem('categories')==null){
      localStorage.setItem('categories',JSON.stringify(this.state.categories))
    }
  }
  handleLogin(flag){
    if (flag) {
      this.setState({isLogged: true})
    }
  }

  handleLogout(){
    this.setState({isLogged: false})
  }
  
  render() { 
    const { isLogged } = this.state
    return (
      <div>
        {isLogged? <Navbar handleLogout={this.handleLogout} /> : ""}
        <Container>
          {!isLogged ? <Login handleLogin={this.handleLogin} /> : <Categories/>}
        </Container>
      </div>
      
     );
  }
}
 
export default App;
