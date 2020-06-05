import React from 'react'
import { Button, Icon, Badge, Text } from 'native-base'
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
    return {cart:state.cart};
}
const mapDispatchToProps = (dispatch)=>{
    return {
        addItemToCart: (item)=>{
            dispatch(addItemToCart(item))
        }
    };
}
class CartIcon extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: this.props.cart
        }

    }
    componentDidMount() {
        this.setState({cart:this.props.cart})
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.cart !== this.props.cart){
            this.setState({cart:this.props.cart})
        }
    }
    render() {
        return (
            <Button transparent onPress={() => this.props.navigate("Cart") }>
                {this.props.cart.length > 0 ?
                <Badge info style={{ position: "absolute", right: 0, top: 0, zIndex: 1000 }}>
                    <Text>{this.props.cart.length}</Text>
                </Badge>
                :<React.Fragment/>}
                <Icon style={{ paddingRight: 6, paddingTop: 6, color:"white" }} name="ios-cart" color="white" />
            </Button>
        )
    }
}
export default connect(mapStateToProps)(CartIcon);
