import React from 'react'
import { Button, Icon, Badge, Text } from 'native-base'
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
    return {
        mapCart:[...state.mapCart]
    };
}
class CartIcon extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mapCart: [...this.props.mapCart],
        }

    }
    componentDidMount() {
        //this.setState({mapCart:this.props.mapCart})
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.mapCart !== this.props.mapCart){
            this.setState({mapCart:[...this.props.mapCart]})
        }
    }
    render() {
        return (
            <Button transparent onPress={() => this.props.navigate("Cart") }>
                {this.state.mapCart.length > 0 ?
                <Badge info style={{ position: "absolute", right: 0, top: 0, zIndex: 1000 }}>
                    <Text>{this.state.mapCart.length}</Text>
                </Badge>
                :<React.Fragment/>}
                <Icon style={{ paddingRight: 6, paddingTop: 6, color:"white"}} name="ios-cart" color="white" />
            </Button>
        )
    }
}
export default connect(mapStateToProps)(CartIcon);
