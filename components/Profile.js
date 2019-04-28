import React, {Component} from 'react';
import {Button, Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Input} from "react-native-elements";
import UserServiceClient from "../services/UserService";
import ProductServiceClient from "../services/ProductService";
import TransServiceClient from "../services/TransService";


export default class Profile extends Component<Props> {
    static navigationOptions = {title: 'Profile'}
    constructor(props) {
        super(props);
        this.state={
            user:this.props.navigation.state.params.user,
            oldUser:"",
            users:[],
            password:"",
            firstname:"",
            lastname:"",
            email:""
        }
        this.userService = UserServiceClient.instance;
    }

    componentDidMount(){
        this.userService.read_all_users_service().
        then(res=>
            this.setState( {oldUser:
            res.filter(user=>user.username===this.props.navigation.state.params.user.username)[0]}))
    }


    update(){
        console.log(this.state.userId);
        let new_user={
            id:this.state.oldUser.id,
            username:this.state.user.username,
            password:this.state.password,
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            email:this.state.email
        }
        this.userService.update_user_service(new_user);
        alert("Your Profile has been updated!")
        this.props.navigation.navigate('Inventory',
            {user:this.state.user})}


    render() {

        return (
            <ScrollView  >
                <Text h1 style={{textAlign:"center"}}>Profile</Text>
                <Text >Username</Text>
                <Input editable={false} placeholder={this.state.oldUser.username}/>
                <Text >Password </Text>
                <Input secureTextEntry={true} placeholder={this.state.oldUser.password}
                       onChangeText={(text) => this.setState({password:text})}
                />
                <Text >First Name </Text>
                <Input  placeholder={this.state.oldUser.firstname}     onChangeText={(text) => this.setState({firstname:text})}        />
                <Text >Last Name </Text>
                <Input  placeholder={this.state.oldUser.lastname}  onChangeText={(text) => this.setState({lastname:text})}   />
                <Text >Email </Text>
                <Input  placeholder={this.state.oldUser.email}   onChangeText={(text) => this.setState({email:text})}/>
                <Button title="UPDATE" color={"green"}
                        onPress={() => this.update()} />
                <Button title="INVENTORY"
                        onPress={() => this.props.navigation.navigate('Inventory',
                            {user:this.state.user})}/>
                <Button title="LOGOUT" color="red"
                        onPress={() =>
                        {alert("See you later");
                            this.props.navigation.navigate('Home')}
                        }/>

            </ScrollView>
        );
    }
}