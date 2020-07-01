import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { Container, View, Button, Text, Icon } from 'native-base';

 export default class OptionsModal extends React.Component {
    constructor() {
        super();
        this.state = {
            // mapCart:this.props.mapCart,
            activeItem: "",
            modalActive: false
        }
    }
    componentDidMount() {
        this.setState({
            activeItem: this.props.activeItem,
            modalActive: this.props.modalActive
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.setState({
                activeItem: this.props.activeItem,
                modalActive: this.props.modalActive
            })
        }
    }

    render() {
        return (
            <ReactNativeModal
                deviceHeight={Dimensions.get("window").height}
                deviceWidth={Dimensions.get("window").width}
                style={{ marginLeft: 0, marginRight: 0, marginTop: 0 }}
                swipeDirection="down"
                coverScreen={false}
                backdropColor="white"
                animationIn="slideInUp"
                animationOut="slideOutDown"
                backdropOpacity={1}
                onSwipeComplete={() => this.setState({ modalActive: false })}
                isVisible={this.state.modalActive}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <Container>
                    <View style={{ flex: 1, alignItems: "flex-start" }}>
                        <Button transparent style={{ width: "auto" }} onPress={() => this.setState({ modalActive: false, activeItem: null })}>
                            <Icon name="ios-close" style={{ color: "black", fontSize: 30 }} />
                        </Button>
                    </View>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>No options available</Text>
                        </View>
                        <Button full onPress={() => {
                            this.props.onSetItem(this.state.activeItem)
                            this.setState({ activeItem: null, modalActive: false })
                        }}
                        >
                            <Text style={styles.modalText}>Add To Cart</Text>
                        </Button>
                    </View>
                </Container>
            </ReactNativeModal>
        )
    }
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        height: "100%",
        width: "100%"
    },
    modalView: {
        backgroundColor: "white",
        alignItems: "center",
        height: "100%",
        width: "100%"
    },
    modalText: {
        textAlign: "center",
        fontFamily: "Avenir"
    }
});