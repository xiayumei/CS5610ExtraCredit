import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking, ScrollView, Button,
} from 'react-native';
import {Input} from "react-native-elements";
import QRCodeScanner from 'react-native-qrcode-scanner';
import UserServiceClient from "../services/UserService";
import ProductServiceClient from "../services/ProductService";
import TransServiceClient from "../services/TransService";

export default class Scan extends Component<Props> {
    static navigationOptions = {title: 'Scan'}

    constructor(props) {
        super(props);
        this.userService = UserServiceClient.instance;
        this.productService=ProductServiceClient.instance;
        this.transService=TransServiceClient.instance;
        this.state={
            products:[],
            user:this.props.navigation.state.params.user,
            barcode:''
        }
    }


    onSuccess(e) {Linking
            .openURL(e.data)
            .catch(err => console.error('An error occured', err));
    }

    render() {
        return (
            <ScrollView  >
                <Text >Enter Barcode String</Text>
                <Input  onChangeText={(text) => this.setState({barcode:text})}/>


                <Button title="SCAN"
                        onPress={() => this.props.navigation.
                        navigate('Product',{barcode:this.state.barcode
                                ,user:this.state.user
                        })}/>
                <Button title="CANCEL" color="red"
                        onPress={() => this.props.navigation.navigate('Inventory')}/>

            </ScrollView>
        );
    }


}
const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
});
/*
<ScrollView  >
                <Text h1 style={{textAlign:"center"}}>Product</Text>
                <Text >Current Quantity</Text>
                <Input placeholder={"123"}/>

                <Button title="Scan" color="blue"
                        onPress={() => this.props.navigation.navigate('Profile')}
                />


                <Button title="Cancel" color="red"
                        onPress={() => this.props.navigation.navigate('Profile')}
                />




            </ScrollView>
              <QRCodeScanner
                onRead={this.onSuccess.bind(this)}
                topContent={
                    <Text style={styles.centerText}>
                        Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text>
                        on your computer and scan the QR code.
                    </Text>
                }
                bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable}>
                        <Text style={styles.buttonText}>OK. Got it!</Text>
                    </TouchableOpacity>
                }
            />
 */
