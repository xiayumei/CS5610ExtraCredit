import React, {Component} from 'react';
import {Button, Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Input} from "react-native-elements";
import UserServiceClient from "../services/UserService";
import ProductServiceClient from "../services/ProductService";
import TransServiceClient from "../services/TransService";



export default class Product extends Component<Props> {
    static navigationOptions = {title: 'Product'}
    constructor(props) {
        super(props);
        this.userService = UserServiceClient.instance;
        this.productService=ProductServiceClient.instance;
        this.transService=TransServiceClient.instance;
        this.state={
            barcode:this.props.navigation.state.params.barcode,
            old_q:0,
            new_q:0,
            products:[],
            user:this.props.navigation.state.params.user,
            new:true,
            pid:0,
            product:{
                barcode:this.props.navigation.state.params.barcode,
                dateAdded: new Date(),
                quantity:0,
                addedBy:this.props.navigation.state.params.user.username,
            }
        }
    }

    componentDidMount(){
        const barcode=this.props.navigation.state.params.barcode;
        this.productService.read_all_products_service().then(res=>
            { const temp=res.filter(product=>product.barcode===barcode);
              if (temp.length>0){
                  this.setState({new:false,product:temp[0],
                      old_q:temp[0].quantity, new_q:temp[0].quantity,pid:temp[0].id
                  })}
            })
    }
    final_product(){
        let product={
            barcode:this.state.product.barcode,
            dateAdded: this.state.product.dateAdded,
            quantity:this.state.new_q,
            user: this.state.product.addedBy
        }
        if (!this.state.new){
            product.id=this.state.pid;
        }
        return product
    }
    get_type(){
       if (this.state.new)
       {return "update"}
       if (this.state.new_q-this.state.old_q>0)
       {return "add"}
       return "minus"
    }
    final_trans(){
        let trans={
            product:this.state.product.barcode,
            type: this.get_type(),
            date: new Date(),
            dif:this.state.new_q-this.state.old_q,
            user:this.state.user.username
        }
        return trans;
    }
    confirm(){
        if (this.state.new){
            this.productService.create_product_service(this.final_product());
        }
        else{
            this.productService.update_product_service(this.final_product());
        }
        this.transService.create_trans_service(this.final_trans());
        alert("Inventory updated!");
        this.props.navigation.navigate('Inventory',{user:this.state.user});
    }

    render() {
        return (
            <ScrollView  >
                <Text h1 style={{textAlign:"center"}}>Product</Text>
                <Text>Product Unique Barcode </Text>
                <Input editable={false} placeholder={this.state.product.barcode}/>
                <Text >Current Quantity</Text>
                <Input editable={false} placeholder={this.state.new_q.toString()}/>

                    <Button title="Minus" color="red"
                            onPress={() => this.setState({new_q:
                                    this.state.new_q-1 <=0? 0: this.state.new_q-1 })}
                           />
                    <Button title="Add" color="green"
                            onPress={() => this.setState({new_q:this.state.new_q+1})}
                             />
                <Button title="Confirm" color="blue"
                        onPress={() =>this.confirm() }
                />
                <Button title="AUDIT"
                        onPress={() => this.props.navigation.navigate('Audit'
                        ,{barcode:this.state.barcode,user:this.state.user}
                        )}/>
                <Text>Date </Text>
                <Text> {new Date().toDateString()}</Text>

            </ScrollView>
        );
    }
}