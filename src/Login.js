import React, { Component } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';


class Login extends Component{
	constructor(props) {
		super(props);
		this.state = {isLogged: false, status: true, email: '', password: '', users: []};

		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount(){
		this.setState({"users": JSON.parse(localStorage.getItem("users"))})
	}

	handleEmailChange(e){
		this.setState({email: e.target.value});
	}
	handlePasswordChange(e){
		this.setState({password: e.target.value});
	}

	handleSubmit(event) {
		let data = this.state.users.filter(user=>{
			if (user.email === this.state.email && user.password === this.state.password) {
				this.setState({'isLogged': true})
				localStorage.setItem("isLogged", true);
				localStorage.setItem("userData", JSON.stringify(user));
				localStorage.setItem("userRole", user.role);
				
				return user;
			}
		})

		if (data.length === 0) {
			this.setState({'status': false})
		}
		else{
			this.props.handleLogin(true)
		}

	}

	render() {
		let message;
		if (this.state.status === false) {
			message = <Message error >
						<Message.Header>Oops!, email or password wrong , please try again.</Message.Header>
					</Message>;
		  } 
		return (
			<div style={{position: 'relative',top: 15 + 'em'}}>
				<Grid centered columns={2}>
					<Grid.Column>
						<Header color="blue" as="h1" textAlign="center">
							Login
						</Header>
						<Segment>
							{message}
							<Form size="large">
								<Form.Input fluid placeholder="Email" value={this.state.email} onChange={this.handleEmailChange}/>
								<Form.Input fluid placeholder="Password" type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
								<Button color="blue" fluid size="large" onClick={this.handleSubmit}>
									Login
								</Button>
							</Form>
						</Segment>
					</Grid.Column>
				</Grid>
			</div>
		)
	}
}

export default Login;