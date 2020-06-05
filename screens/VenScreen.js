import React from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Animated
} from 'react-native'
import { H1, Card, CardItem, Left, Body, Right, Icon, Text, H3, Button } from 'native-base'
import { connect } from 'react-redux';
import { addItemToCart } from '../redux/app-redux';
import firebase from "../firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import Tag from './components/Tag';
import { TouchableOpacity } from 'react-native-gesture-handler';
var db = firebase.firestore();
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (item) => {
      dispatch(addItemToCart(item))
    }
  };
}
class MenuScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uri: 'https://cdn.dribbble.com/users/1846841/screenshots/4961950/epi_x.png',
      cart: this.props.cart,
      menu: null
    }
    this.scrollY = new Animated.Value(0)
  }
  componentDidMount() {
    let photo = this.props.route.params.location.photo;
    this.setState({
      uri: photo
    });
    this.props.navigation.setOptions({ title: this.props.route.params.location.name });
    this.getMenu(this.props.route.params.location.id);
  }
  getMenu(id) {
    let menuRef = db.collection("locations").doc("menus").collection(this.props.route.params.location.state.abbreviation).doc(id);
    menuRef.get().then(doc => {
      if (doc.exists) {
        this.setState({ menu: doc.data() })
      }
    })
  }
  onSetItem = (item) => {
    let tempCart = Object.assign([], this.props.cart);
    tempCart.push(item)
    this.props.addItemToCart(tempCart);
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
            {this.state.menu && this.state.menu.sections[0].subsections.map(item => (
              <React.Fragment key={item.title}>
                <View>
                  <Card>
                    <CardItem>
                      <Body>
                        <H3>{item.title}</H3>
                      </Body>
                    </CardItem>
                  </Card>
                </View>
                {item.items.map(field => (
                  <TouchableOpacity onPress={()=>this.onSetItem(field)}>
                  <View style={styles.item} key={field.external_id}>
                    <Card transparent>
                      <CardItem>
                        <Left>
                          <Text>{field.title}</Text>
                        </Left>
                      </CardItem>
                      <CardItem>
                        <Left style={{alignItems:"bottom"}}>
                          <Tag><Text>${field.price}</Text></Tag>
                          <Tag><Text numberOfLines={1} note>{field.item_description}</Text></Tag>
                        </Left>
                        </CardItem>
                    </Card>
                  </View>
                  </TouchableOpacity>
                ))}
              </React.Fragment>
            ))}
          </View>
          <View style={styles.stickyHeaderContainer}>
            <Animated.View style={[styles.headerContainer, { width: headerContainerWidth }]}>
              <H1 style={{ textAlign: "center" }}>{this.props.route.params.location.name}</H1>
            </Animated.View>
          </View>
        </ScrollView>
      </View>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);
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
    justifyContent: "center",
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
    height: "auto"
  }
})