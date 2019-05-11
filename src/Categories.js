import React, { Component } from 'react'
import { Accordion, Icon, Card, Modal, Button, Form, Segment, Message } from 'semantic-ui-react'
import Item from './components/Item'
import './Categories.css'

class Categories extends Component {

  constructor(){
    super();
    this.state = { userRole: '', activeIndex: 0, categories: [], categoryStatus: '', itemStatus: '', showCategoryModal: false, showItemModal:false, activeItem: '', itemId: '', itemName: '', itemPrice: '', itemDesc: '', catItems: [], error: false }

    this.openItemModal = this.openItemModal.bind(this);
    this.openCategoryModal = this.openCategoryModal.bind(this);
    this.handleCategoryChanges = this.handleCategoryChanges.bind(this);
    this.handleItemChanges = this.handleItemChanges.bind(this);

    this.addCategory = this.addCategory.bind(this);
    this.editCategory = this.editCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.clearInputs = this.clearInputs.bind(this);
    
    this.addItem = this.addItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentWillMount(){
    this.setState({'userRole': localStorage.getItem("userRole")})
    this.setState({'categories': JSON.parse(localStorage.getItem("categories"))})
  }

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, showItemModal: true })
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  // clear inputs value to add new element (category/ item)
  clearInputs(){
    this.setState({itemId: ''})
    this.setState({itemName: ''})
    this.setState({itemDesc: ''})
    this.setState({itemPrice: ''})
    this.setState({catItems: []})
  }

  openItemModal(data, itemIndex){
    if (data) {
      this.setState({'itemStatus': 'Edit'})
      this.setState({activeItem: itemIndex})
      this.setState({itemId: data.id})
      this.setState({itemName: data.name})
      this.setState({itemDesc: data.description})
      this.setState({itemPrice: data.price})
    }else{
      this.setState({'itemStatus': 'Add'})
      this.clearInputs()
    }
    this.setState({showItemModal: true})
  }

  // I use one modal for edit & add category so if case of add the modal input must be empty & in edit get data of edited category
  openCategoryModal(data){
    if (data) {
      this.setState({'categoryStatus': 'Edit'})
      this.setState({itemId: data.id})
      this.setState({itemName: data.name})
      this.setState({itemDesc: data.description})
      this.setState({catItems: data.items})
    }else{
      this.setState({'categoryStatus': 'Add'})
      this.clearInputs()
    }
    this.setState({showCategoryModal: true})
  }

  // check if user want to add or edit category according to category status
  handleCategoryChanges(){
    switch (this.state.categoryStatus) {
      case 'Add':
        this.addCategory()
        break;
    
      case 'Edit':
        this.editCategory()
        break;
    }
  }

  // check if user want to add or edit item
  handleItemChanges(){
    switch (this.state.itemStatus) {
      case 'Add':
        this.addItem()
        break;
    
      case 'Edit':
        this.editItem()
        break;
    }
  }

  // category (add, edit, delete) function
  addCategory(){
    if (this.state.itemName) {
      this.setState({error: false})
      let newCategory = {
        name: this.state.itemName,
        description: this.state.itemDesc,
        items: []
      }
      this.state.categories.push(newCategory)
      this.setState({showCategoryModal: false})
      localStorage.setItem('categories', JSON.stringify(this.state.categories))
    }else{
      this.setState({error: true})
    }
  }

  editCategory(){
    let newCategory = {
      name: this.state.itemName,
      description: this.state.itemDesc,
      items: this.state.catItems
    }
    let newData = this.state.categories.map((cat, i)=>{
      if (i == this.state.activeIndex) {
        cat = newCategory
      }
      return cat
    })
    this.setState({"categories": newData})
    this.setState({showCategoryModal: false})
    localStorage.setItem('categories', JSON.stringify(newData))
  }

  deleteCategory(){
    let data = this.state.categories
    data.splice(this.state.activeIndex, 1)
    this.setState({"categories": data})
    localStorage.setItem('categories', JSON.stringify(data))
  }


  // category item functions
  addItem(){
    if (this.state.itemName && this.state.itemPrice) {
      this.setState({error: false})
      let newItem = {
        name: this.state.itemName,
        description: this.state.itemDesc,
        price: this.state.itemPrice,
      }
      let newData = this.state.categories.map((cat, i)=>{
        if (i == this.state.activeIndex) {
          cat.items.push(newItem)
        }
        return cat
      })
      this.setState({"categories": newData})
      this.setState({showItemModal: false})
      localStorage.setItem('categories', JSON.stringify(newData))
    }else{
      this.setState({error: true})
    }
  }

  editItem(){
    let newItem = {
      id: this.state.itemId,
      name: this.state.itemName,
      description: this.state.itemDesc,
      price: this.state.itemPrice,
    }
    let newData = this.state.categories.map((cat, i)=>{
      if (i == this.state.activeIndex) {
        cat.items[this.state.activeItem] = newItem
      }
      return cat
    })
    this.setState({"categories": newData})
    this.setState({showItemModal: false})
    localStorage.setItem('categories', JSON.stringify(newData))
  }

  deleteItem(itemIndex){
    let newData = this.state.categories.map((cat, i)=>{
      if (i == this.state.activeIndex) {
        cat.items.splice(itemIndex, 1)
      }
      return cat
    })
    this.setState({"categories": newData})
    localStorage.setItem('categories', JSON.stringify(newData))
  }


  // close modals
  closeCategoryModal = () => {this.setState({ showCategoryModal: false }); this.setState({error: false})}
  closeItemModal = () => {this.setState({ showItemModal: false }); this.setState({error: false})}

  render() {
    const { userRole, activeIndex, categories, categoryStatus, showCategoryModal, itemStatus, showItemModal, closeOnEscape, closeOnDimmerClick, error } = this.state;

    let element = categories.map((category, i) => (
      <div key={i}>
        <Accordion.Title active={activeIndex === i} index={i} color="teal" onClick={this.handleClick}>
          <Icon name='align justify' />
          {category.name}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === i}>
          <h4>Name* : {category.name}</h4>
          {category.description? <h4>Description : {category.description}</h4>: ''}

          {userRole == "admin" ? <div><Button basic color="green" onClick={e => this.openCategoryModal(category)}>Edit Category</Button>
          <Button basic color="red" onClick={this.deleteCategory}>Delete Category</Button></div> : ''}

          <h3>Items</h3>
          {userRole == "admin" ? <Button basic color="teal" onClick={e=> this.openItemModal()}>Add New Item</Button> : ''}
          <Card.Group>
            {category.items.map((item, i)=> <Item data={item} index={i} key={i} editItem={this.openItemModal} deleteItem={this.deleteItem} />)}
          </Card.Group>
        </Accordion.Content>
      </div>
    )
    
    )

    return (
      <div className="category">
        
        {userRole == "admin" ? <Button basic color="teal" onClick={e=> this.openCategoryModal()}>Add New Category</Button> : ''}

        <Segment color='grey'>
          <h2>Menu Data</h2>

          <Accordion fluid styled>
            {element}
          </Accordion>

          {/* Add & edit Category Modal */}
          <Modal open={showCategoryModal} closeOnEscape={closeOnEscape} closeOnDimmerClick={closeOnDimmerClick} onClose={this.closeCategoryModal}>
            <Modal.Header>{categoryStatus} Category</Modal.Header>
            
            <Modal.Content>
              {error ? <Message error >
                <Message.Header>Category Name is required</Message.Header>
              </Message> : ''}
              <Form size="large">
                <Form.Input fluid placeholder="Name *" value={this.state.itemName} onChange={e=> this.setState({itemName: e.target.value})}/>
                <Form.Input fluid placeholder="Description" value={this.state.itemDesc} onChange={e=> this.setState({itemDesc: e.target.value})}/>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.closeCategoryModal} negative>
                Close
              </Button>
              <Button
                onClick={this.handleCategoryChanges}
                positive
                content='Save'
              />
            </Modal.Actions>
          </Modal>
        
          
          {/* Add & Edit Item Modal  */}
          <Modal open={showItemModal} closeOnEscape={closeOnEscape} closeOnDimmerClick={closeOnDimmerClick} onClose={this.closeItemModal}>
            <Modal.Header>{itemStatus} Item</Modal.Header>
            <Modal.Content>
              {error ? <Message error >
                <Message.Header>Item Name & Price are required</Message.Header>
              </Message> : ''}
              <Form size="large">
                <Form.Input fluid placeholder="Name" value={this.state.itemName} onChange={e=> this.setState({itemName: e.target.value})}/>
                <Form.Input fluid placeholder="Description" value={this.state.itemDesc} onChange={e=> this.setState({itemDesc: e.target.value})}/>
                <Form.Input fluid placeholder="price" type="number" value={this.state.itemPrice} onChange={e=> this.setState({itemPrice: e.target.value})}/>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.closeItemModal} negative>
                Close
              </Button>
              <Button
                onClick={this.handleItemChanges}
                positive
                content='Save'
              />
            </Modal.Actions>
          </Modal>
        </Segment>
      </div>
    )
  }
}

export default Categories;