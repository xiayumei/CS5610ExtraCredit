import React, {Component} from 'react';
import {Button, Platform, ScrollView, StyleSheet, View,TextInput} from 'react-native';
import {Input,Text,Icon,ListItem,ButtonGroup} from "react-native-elements";
import UserServiceClient from "../services/UserService";
import ProductServiceClient from "../services/ProductService";
import TransServiceClient from "../services/TransService";
import DatePicker from "react-native-datepicker";


const trans=[{type:"item 0",quantity:123,user:"dan",date:"01/01"}]




export default class Audit extends Component<Props> {
    static navigationOptions = {title: 'Audit'};
    constructor(props) {
        super(props);
        this.userService = UserServiceClient.instance;
        this.productService=ProductServiceClient.instance;
        this.transService=TransServiceClient.instance;
        this.state={
            trans:[],
            which: "all",
            user:this.props.navigation.state.params.user,
            search_user:'',
            search_from:"2019-01-01",
            search_to:"2020-01-01",
            being_searched: false,
        }
    }
    componentDidMount(){
       this.transService.read_all_trans_service().then(res=> {
           res=res.filter(tran=>tran.product===this.props.navigation.state.params.barcode);
           res.sort(function(a,b){
               return new Date(b.date) - new Date(a.date);
           });
           this.setState({trans:res});})
    }


    getColor(type){
        switch (type) {
            case "add":
                return "success";
            case "minus":
                return "error";
            default:
                return "primary";
        }
    }

    dd(dateObj ){
        dateObj=new Date(dateObj)
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        return year + "/" + month + "/" + day;
    }
    up(){
        this.setState({trans:this.state.trans.reverse()})

    }


    render() {
        let list=[];
            switch(this.state.which){
                case "add":
                 list=this.state.trans.filter(tran=>tran.type==="add");
                 break;
                case "minus":
                    list=this.state.trans.filter(tran=>tran.type==="minus");
                    break;
                case "update":
                    list=this.state.trans.filter(tran=>tran.type==="update");
                    break;
                default:
                    list=this.state.trans;
        }
        if(this.state.being_searched ){
            list=list.filter(tran=>tran.user===this.state.search_user);
            list=list.filter(tran=> new Date(tran.date)> new Date (this.state.search_from))
            list=list.filter(tran=>new Date(tran.date)< new Date (this.state.search_to))
        }


        return (
            <ScrollView  >
                <Text h3 style={{textAlign:"center"}}>AUDIT</Text>
                <Button title="INVENTORY"
                        onPress={() =>
                            this.props.navigation.navigate(
                                'Inventory',{user:this.state.user}   )   }/>
                <View style={{flexDirection: "row"}} >
                    <Button title="All" color={"orange"}
                            onPress={() =>
                            {this.componentDidMount();
                                this.setState({which:"all",being_searched: false,
                                search_user:""})}

                            }
                            style = {{ flex: 1 }}  />
                    <Button title="Minus" color={"red"}
                            onPress={() => this.setState({which:"minus"})}
                            style = {{ flex: 1 }}   />

                <Button title="Add" color={"green"}
                        onPress={() => this.setState({which:"add"})}
                        style = {{ flex: 1 }}   />

                <Button title="Update" color={"blue"}
                        onPress={() => this.setState({which:"update"})}
                        style = {{ flex: 1 }}    />
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

                    <Icon
                        raised
                        name='arrow-up'
                        type='font-awesome'
                        color='blue'
                        onPress={() => this.up()}  />
                    <Icon
                        raised
                        name='search'
                        type='font-awesome'
                        color='blue'
                        onPress={() => this.setState({being_searched: true})

                        } />
                </View>

                {list.map((tran, i) => (
                    <ListItem
                        key={i}
                        title= {'User: ' + tran.user}
                        subtitle= {"Date: "  + this.dd(tran.date)}
                        badge={{ value: tran.dif, status:this.getColor(tran.type) , containerStyle: { marginTop: 20 } }}
                    />
                ))}

            </ScrollView>
        );
    }


}
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
        flexDirection: "row"
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});