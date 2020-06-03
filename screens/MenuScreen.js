import React from 'react'
import {
    Image,
    ScrollView,
    StyleSheet,
    View,
    Animated,
    Text
} from 'react-native'
import { H1 } from 'native-base'

export default class MenuScreen extends React.Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props)
        this.state = {
            uri: 'https://cdn.dribbble.com/users/1846841/screenshots/4961950/epi_x.png',
            images: {
                burgers: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                beer: 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                frenchfries: 'https://images.unsplash.com/photo-1589963099822-196152500713?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                icecream: 'https://images.unsplash.com/photo-1560801619-01d71da0f70c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                tacos: 'https://images.unsplash.com/photo-1562059390-a761a084768e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                hotdogs: 'https://images.unsplash.com/photo-1585238340475-400f04d2c8a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            },
            headerName: ""
        }
        this.scrollY = new Animated.Value(0)
    }
    componentDidMount() {
        let item = String(this.props.route.params.item);
        this.setState({
            uri: this.state.images[item]
        });
        switch (item) {
            case "frenchfries": this.setState({ headerName: "French Fries" });
                break;
            case "icecream": this.setState({ headerName: "Ice Cream" });
                break;
            default: this.setState({ headerName: item.charAt(0).toUpperCase() + item.substring(1, item.length) })
        }
    }
    render() {
        const headerContainerWidth = this.scrollY.interpolate({
            inputRange: [0, 125],
            outputRange: ['90%', '100%'],
            extrapolate: 'clamp'
        })

        const imageContainerHeight = this.scrollY.interpolate({
            inputRange: [-200, 0],
            outputRange: [450, 250],
            extrapolate: 'extend'
        })

        return (
            <View style={styles.container}>
                <Animated.View style={[styles.imageContainer, { height: imageContainerHeight }]}>
                    <Image style={styles.image} source={{ uri: this.state.uri }} />
                </Animated.View>
                <ScrollView onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }])}
                    scrollEventThrottle={16}
                    stickyHeaderIndices={[1]}
                    style={styles.scrollViewContainer}
                >
                    <View style={styles.contentContainer}>
                    
                        <View style={styles.item}></View>
                        <View style={styles.item}></View>
                        <View style={styles.item}></View>
                        <View style={styles.item}></View>
                        <View style={styles.item}></View>
                        <View style={styles.item}></View>
                        <View style={styles.item}></View>
                        <View style={styles.item}></View>
                        <View style={styles.item}></View>
                    </View>
                    <View style={styles.stickyHeaderContainer}>
                        <Animated.View style={[styles.headerContainer, { width: headerContainerWidth }]}>
                        <H1 style={{textAlign:"center"}}>{this.state.headerName}</H1>
                        </Animated.View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    scrollViewContainer: {
        flex: 1
    },
    imageContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 200,
        backgroundColor: '#fff'
    },
    stickyHeaderContainer: {
        position: 'absolute',
        top: 125,
        left: 0,
        right: 0
    },
    headerContainer: {
        justifyContent:"center",
        width: '90%',
        height: 150,
        backgroundColor: '#fff',
        alignSelf: 'center',
        shadowColor: 'rgba(0,0,0,0.1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 5
    },
    contentContainer: {
        marginTop: 290,
        backgroundColor: '#eee'
    },
    image: {
        flex: 1
    },
    item: {
        margin: 10,
        backgroundColor: '#fff',
        height: 100
    }
})