import React, {Component} from 'react';
import {Button, Platform, ScrollView, StyleSheet, View} from 'react-native';
import {Input,Text} from "react-native-elements";
import UserServiceClient from "../services/UserService";
import ProductServiceClient from "../services/ProductService";
import TransServiceClient from "../services/TransService";

export default class Login extends Component<Props> {
    static navigationOptions = {title: 'Login'}
    constructor(props) {
        super(props);
        this.userService = UserServiceClient.instance;

        this.state={
            username : "",
            password : "",
            users:[],
            user:{}
        }
    }
    componentDidMount(){
        this.userService.read_all_users_service().then(res=>this.setState({users:res}));
    }
    login(){

        let temp=this.state.users.filter(user=> user.username===this.state.username && user.password===this.state.password);

       if (temp.length>0)
       {
           this.setState({user: temp[0]});
           alert("Welcome back");
           this.props.navigation.navigate('Inventory',{user:temp[0]})
       }

       else{alert("Wrong Credentials")}

    }

    render() {

        return (
            <ScrollView  >
                <Text h1 style={{textAlign:"center"}}>LOGIN</Text>
                <Text >Username</Text>
                <Input  onChangeText={(text) => this.setState({username:text})} />
                <Text >Password</Text>
                <Input secureTextEntry={true} onChangeText={(text) => this.setState({password:text})}/>
                <Button title="LOGIN"
                        onPress={() => this.login()}/>
                <Button title="REGISTER" color="green"
                        onPress={() => this.props.navigation.navigate('Register')}/>

            </ScrollView>
        );
    }
}