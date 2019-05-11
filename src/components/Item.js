import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import './Item.css'


class Item extends Component {
  constructor(props){
    super(props)
    this.state={userRole: ''};
  }
  componentWillMount(){
    this.setState({'userRole': localStorage.getItem("userRole")})
  }

  render() { 
    const {userRole} = this.state;
    return ( 
        <Card>
          <Card.Content>
            <Card.Header>{this.props.data.name}</Card.Header>
            <Card.Description>
              {this.props.data.description}
            </Card.Description>
            <Card.Meta>Price: {this.props.data.price}</Card.Meta>
          </Card.Content>
          {userRole == "admin" ?<Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green' onClick={e=>this.props.editItem(this.props.data, this.props.index)}>
                Edit
              </Button>
              <Button basic color='red' onClick={e=>this.props.deleteItem(this.props.index)}>
                Delete
              </Button>
            </div>
          </Card.Content> : ''}
        </Card>
      );
  }
}

export default Item