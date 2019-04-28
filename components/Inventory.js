import React, {Component} from 'react';
import {Button, Platform, ScrollView, StyleSheet, View,TextInput} from 'react-native';
import {Input,Text,Icon,ListItem} from "react-native-elements";
import UserServiceClient from "../services/UserService";
import ProductServiceClient from "../services/ProductService";
import TransServiceClient from "../services/TransService";
import DatePicker from "react-native-datepicker";

const items=[{name:"item 0",quantity:123},{name:"item 1",quantity:123},{name:"item 2",quantity:123},{name:"item 3",quantity:123}
]

export default class Inventory extends Component<Props> {
    static navigationOptions = {title: 'Inventory'};
    constructor(props) {
        super(props);
        this.userService = UserServiceClient.instance;
        this.productService=ProductServiceClient.instance;
        this.transService=TransServiceClient.instance;
        this.state={
            user:this.props.navigation.state.params.user,
            products:[],
            from:'',
            to:'',
            who:'',
            search_user:"",
            search_from:"2019-01-01",
            search_to:"2020-01-01",
            being_searched: false,
        }
    }
    componentDidMount(){
        this.productService.read_all_products_service().then(res=>{
            res.sort(function(a,b){
                return new Date(b.dateAdded) - new Date(a.dateAdded);
            });
            this.setState({products:res});})
    }


    up(){
        this.setState({products:this.state.products.reverse()})

    }

    scan(){
        if (this.state.user==="")
        {
            alert("You need to Log In first to manage the inventory.");
            return;
        }
        this.props.navigation.navigate('Scan',{user:this.state.user});
    }
    edit(barcode){
        if (this.state.user==="")
        {
            alert("You need to Log In first to manage the inventory.");
            return;
        }
        this.props.navigation.
        navigate('Product',{barcode:barcode
            ,user:this.state.user})

    }
    dd(dateObj ){
        dateObj=new Date(dateObj)
        const month = dateObj.getUTCMonth() + 1; //months from 1-12
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();
        return year + "/" + month + "/" + day;
    }


    render() {
        let list=this.state.products;
        if(this.state.being_searched ){
            list=list.filter(tran=>tran.user===this.state.search_user);
            list=list.filter(tran=> new Date(tran.dateAdded)> new Date (this.state.search_from))
            list=list.filter(tran=>new Date(tran.dateAdded)< new Date (this.state.search_to))
        }


        return (
            <ScrollView  >
                <Text h1 style={{textAlign:"center"}}>INVENTORY</Text>
                <Button title="PROFILE"  color="orange"
                        onPress={() => {
                            if  (this.state.user===""){
                                alert("Please Log In First.");
                                return;}
                            this.props.navigation.navigate('Profile',{user:this.state.user})}
                        }/>
                <Button title="SCAN"
                        onPress={() =>this.scan() }/>
                <Button title="ALL"  color="green"
                        onPress={() =>
                        {this.componentDidMount();
                            this.setState({ being_searched: false})} }/>

                <View style={{flexDirection: "row"}}>

                <Icon
                    raised
                    name='arrow-up'
                    type='font-awesome'
                    color='blue'
                    onPress={() => this.up()}  style = {{ flex: 1 }}/>

                <Icon
                    raised
                    name='search'
                    type='font-awesome'
                    color='blue'
                    onPress={() =>this.setState({ being_searched: true}) }
                    style = {{ flex: 1 }}/>
                    <Input placeholder={"username"} onChangeText={(text) => this.setState({search_user:text})}/>
                </View>


                <View style={{flexDirection: "row"}}>
                    <Text>From </Text>
                    <DatePicker
                        style={{width: 120}}
                        date={this.state.search_from}
                        mode="date"
                        placeholder={this.state.search_from}
                        format="YYYY-MM-DD"
                        minDate="2000-01-01"
                        maxDate="2020-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 10
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.setState({search_from: date})}}
                    />
                    <Text>To </Text>
                    <DatePicker
                        style={{width: 120}}
                        date={this.state.search_to}
                        mode="date"
                        placeholder={this.state.search_to}
                        format="YYYY-MM-DD"
                        minDate="2000-01-01"
                        maxDate="2020-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 10
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.setState({search_to: date})}}
                    />

                </View>

                {list.map((item, i) => (
                    <ListItem
                        key={i}
                        title= {'SKU: ' + item.barcode + " "+ "Quantity: "  + item.quantity}
                        subtitle= {"Date Added: "+ this.dd(item.dateAdded) + "        By: "  + item.user + " "  }
                        badge={{ value: "Click to edit", color: 'blue' , containerStyle: { marginTop: -20 } }}
                        onPress={()=>this.edit(item.barcode)
                         }

                        />
                ))}


            </ScrollView>
        );
    }
}