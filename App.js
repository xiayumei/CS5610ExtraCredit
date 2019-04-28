
import React, {Component} from 'react';
import {Platform, StyleSheet, View,ScrollView,Button,TextInput} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation'
import { Input,Text } from 'react-native-elements';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import Inventory from './components/Inventory';
import Product from   './components/Product';
import Audit from './components/Audit';
import Scan from './components/Scan';
import DatePicker from "react-native-datepicker";



type Props = {};
class Home extends Component<Props> {

    constructor(props) {
        super(props);
        this.state={
            user:"",
            login: false
        }
    }

    static navigationOptions = {
        title: 'Home'
    }
    render() {
        return (
            <ScrollView  >
                <Text h1 style={styles.welcome}>HOME</Text>
                <Button title="LOGIN" hide={this.user!==""}
                        onPress={() => this.props.navigation.navigate('Login')}/>
                <Button title="REGISTER" color="green"  hide={this.user!==""}
                        onPress={() => this.props.navigation.navigate('Register')}/>
                <Button title="INVENTORY"
                        onPress={() => this.props.navigation.navigate('Inventory',{user:this.state.user}   )   }/>
                <Button title="PROFILE"  color="orange"
                        onPress={() => {
                            if  (this.state.user===""){
                                alert("Please Log In First.");
                                return;}
                            this.props.navigation.navigate('Profile')}
                        }/>


            </ScrollView>
        );
    }
}
const App = createStackNavigator({
    Home,
    Login,
    Profile,
    Register,
    Inventory,
    Product,
    Audit,
    Scan
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        padding:10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
export default createAppContainer(App);
/*
             <Button title="PRODUCT"
                        onPress={() => this.props.navigation.navigate('Product')}/>
                <Button title="AUDIT"
                        onPress={() => this.props.navigation.navigate('Audit')}/>
                <Button title="SCAN"
                        onPress={() => this.props.navigation.navigate('Scan')}/>
 */