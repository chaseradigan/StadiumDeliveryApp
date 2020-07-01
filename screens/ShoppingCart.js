import React from 'react';
import firebase from "../firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import { View, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { removeItem, addItem } from '../redux/app-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Container, Icon, Left, Right, Body, H1, Text, Card, CardItem, Button, List, ListItem, Content, Label, Segment } from 'native-base';
import OptionsModal from './components/OptionsModal';

const mapStateToProps = (state) => {
    return {
        mapCart: state.mapCart
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (item) => {
            dispatch(removeItem(item))
        },
        addItem: (item) => {
            dispatch(addItem(item))
        }
    };
}
class ShoppingCartScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapCart: this.props.mapCart,
            total: 0,
            modalActive:false,
            activeItem:null
        }
    }
    componentDidMount() {
        this.getTotal([...this.props.mapCart]);
    }
    getTotal(cart) {
        if (cart.length > 0) {
            let total = 0;
            for (let i = 0; i < cart.length; i++) {
                total = total + Number(cart[i][1].price) * Number(cart[i][1].count);
            }
            this.setState({ total: total })
        }
    }
    addItem(item) {
        this.props.addItem(item);
        this.setState({ mapCart: this.props.mapCart, activeItem:null, modalActive:false });
        this.getTotal([...this.state.mapCart])
    }
    removeItem(item) {
        this.props.removeItem(item);
        this.setState({ mapCart: this.props.mapCart });
        this.getTotal([...this.state.mapCart])
    }
    renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
            >
                <Icon name="ios-more" />
            </TouchableOpacity>
        </View>
    );
    renderItem = data => {
        return (
            <TouchableHighlight
                onPress={() => this.setState({modalActive:true, activeItem:data.item[1]})}
                style={styles.rowFront}
                underlayColor={'#AAA'}
            >
                <Card style={{ height: "100%" }}>
                    <CardItem>
                        <Left style={{ flexDirection: "row" }}>
                            <Label>{data.item[1].title}</Label>
                            <Text note style={{ fontFamily: "Avenir-LightOblique" }}>${data.item[1].price} (x{data.item[1].count})</Text>
                        </Left>
                        <Right>
                            <Segment style={{ backgroundColor: "white" }}>

                                <Button onPress={() => this.addItem(data.item[1])} first>
                                    <Icon name="ios-add" />
                                </Button>
                                <Button onPress={() => this.removeItem(data.item[1])} last>
                                    <Icon name="ios-remove" />
                                </Button>
                            </Segment>
                        </Right>
                    </CardItem>
                </Card>
            </TouchableHighlight>
        )
    };
    render() {
        return (
            <Container>
                <OptionsModal onSetItem={(item)=>this.addItem(item)} activeItem={this.state.activeItem} modalActive={this.state.modalActive}/>
                {[...this.state.mapCart].length > 0 ?
                    <>
                        <View style={styles.headerContainer} scrollEnabled={false}>
                            <H1>Cart</H1>
                        </View>
                        <SwipeListView
                            data={[...this.state.mapCart]}
                            renderItem={this.renderItem}
                            renderHiddenItem={this.renderHiddenItem}
                            disableRightSwipe
                            rightOpenValue={-100}
                            keyExtractor={(item, index) => String(item[1].key)}
                        >

                        </SwipeListView>
                        <List>
                            <ListItem>
                                <Text note>Subtotal: </Text><Text>${Number(this.state.total).toFixed(2)}</Text>
                            </ListItem>
                            <ListItem>
                                <Text note>Taxes: </Text><Text>${Number(this.state.total * 0.10).toFixed(2)}</Text>
                            </ListItem>
                            <ListItem>
                                <Text note>Total: </Text><Text>${Number(this.state.total + (this.state.total * 0.10)).toFixed(2)}</Text>
                            </ListItem>
                        </List>
                        <Button style={{ borderRadius: '0' }} block iconLeft onPress={}><Icon name="ios-checkmark" /><Text>Checkout (${Number(this.state.total + (this.state.total * 0.10)).toFixed(2)})</Text></Button>
                    </> :
                    <Content contentContainerStyle={{ justifyContent: "center", height:"100%" }}>
                        <Card transparent>
                            <CardItem style={{justifyContent:"center", width:"auto"}}>
                                <Icon style={{fontSize:100, width:"auto", color:"rgba(0,0,0,0.2)"}} name="ios-cart" />
                            </CardItem>
                            <CardItem style={{justifyContent:'center'}}>
                                <Text note style={{ fontFamily: "Avenir-LightOblique", textAlign: "center" }}>
                                    There's nothing in your cart
                                </Text>
                            </CardItem>
                        </Card>
                    </Content>}
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    fontAnvenir: {
        fontFamily: "Avenir"
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 30,
        flexWrap: 'wrap'
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        backgroundColor: '#dcdcdc',
        justifyContent: 'center',
        height: 75,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 100,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: '#dcdcdc',
        right: 0,
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartScreen);