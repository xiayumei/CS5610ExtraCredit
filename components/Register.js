import React, {Component} from 'react';
import {Button, Platform, ScrollView, StyleSheet,  View,} from 'react-native';
import {Text,Input } from 'react-native-elements'
import UserServiceClient from "../services/UserService";

export default class Register extends Component<Props> {
    static navigationOptions = {title: 'Register'}
    constructor(props) {
        super(props);
        this.userService = UserServiceClient.instance;
        this.state={
            username : "",
            password : "",
            users:[]
        }
        this.register=this.register.bind(this);
    }
    componentDidMount(){
        this.userService.read_all_users_service().then(res=>this.setState({users:res}));
    }
    register(){
        let username = this.state.username;
        let password = this.state.password;
        let user = {
            username: username,
            password: password,
        };
        this.userService.create_user_service(user);
        alert("Welcome!");
        this.props.navigation.navigate('Inventory',{user:user})
    }


    render() {
        return (
            <ScrollView  >
                <Text h1 style={{textAlign:"center"}}>REGISTER</Text>
                <Text >Username</Text>
                <Input  onChangeText={(text) => this.setState({username:text})}/>
                <Text >Password</Text>
                <Input secureTextEntry={true}  onChangeText={(text) => this.setState({password:text})}/>
                <Text >Verify Password</Text>
                <Input secureTextEntry={true}/>
                <Button title="REGISTER" color="green"
                        onPress={() => this.register()}/>
                <Button title="LOGIN"
                        onPress={() => this.props.navigation.navigate('Login')}/>
            </ScrollView>
        );
    }
}