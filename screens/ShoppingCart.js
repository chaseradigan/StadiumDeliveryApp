import React from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { removeItemFromCart } from '../redux/app-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Container, Content, ListItem, Left, Right, Body, H1, Text } from 'native-base';
const mapStateToProps = (state) => {
    return {
        cart: state.cart,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeItemFromCart: (item) => {
            dispatch(removeItemFromCart(item))
        }
    };
}
class ShoppingCartScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: this.props.cart
        }
    }
    componentDidMount() {

    }
    removeItem(external_id) {
        let tempCart = this.props.cart;
        let newCart = [];
        for (let i = 0; i < tempCart.length; i++) {
            if (tempCart[i].external_id !== external_id) {
                newCart.push(tempCart[i]);
            }
        }
        this.props.removeItemFromCart(newCart);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cart !== this.state.cart) {
            this.setState({ cart: this.props.cart })
        }
    }


    deleteRow(rowMap, rowKey, external_id){
        rowMap[rowKey].closeRow();
        const newData = [...this.state.cart];
        const prevIndex = this.state.cart.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        this.setState({cart:newData})
        this.removeItem(external_id);
    }
    renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => this.deleteRow(rowMap, data.item.key, data.item.external_id)}
            >
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
    renderItem = data => (
        <TouchableHighlight
            onPress={() => console.log('You touched me')}
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
            <ListItem>
                <Left>
                    <Text>{data.item.title}</Text>
                    <Text note>${data.item.price}</Text>
                </Left>
                <Body/>
                <Right />
            </ListItem>
        </TouchableHighlight>
    );
    render() {
        //console.log(this.props.cart[0], "85")
        return (
            <Container>
                <View style={styles.headerContainer} scrollEnabled={false}>
                    <H1>Cart</H1>
                </View>
                <View>
                    <SwipeListView
                        data={this.state.cart}
                        renderItem={this.renderItem}
                        leftOpenValue={75}
                        renderHiddenItem={this.renderHiddenItem}
                        disableRightSwipe
                        rightOpenValue={-150}
                    >
                    </SwipeListView>
                </View>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
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
        borderBottomColor: 'black',
        borderBottomWidth: 1,
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
        width: 150,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartScreen);