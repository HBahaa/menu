import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

class Navbar extends Component {
  constructor(props){
    super(props)

    this.logout = this.logout.bind(this)
  }
  state = { activeItem: 'Categories', user:{} }

  componentWillMount(){
    this.setState({'user': JSON.parse(localStorage.getItem("userData"))})
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  logout(){
    localStorage.removeItem("isLogged")
    localStorage.removeItem("userData")
    localStorage.removeItem("userRole")
    this.props.handleLogout();
  }

  render() {
    const { activeItem, user } = this.state

    return (
      <div>
        <Menu>
          <Menu.Item name='Categories' active={activeItem === 'Categories'} onClick={this.handleItemClick} />
					<Menu.Menu position='right'>
            <Menu.Item >
                Welcome: {user.name}
              </Menu.Item>
            <Menu.Item onClick={this.logout}>
              Logout
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

export default Navbar; 