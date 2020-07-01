import React from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Animated,
} from 'react-native'
import { H1, Card, CardItem, Left, Body, Right, Icon, Text, H3, Button, Segment, Row, Col, Header, Container } from 'native-base'
import { connect } from 'react-redux';
import { addItem } from '../redux/app-redux';
import firebase from "../firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import Tag from './components/Tag';
import { TouchableOpacity } from 'react-native-gesture-handler';
import OptionsModal from './components/OptionsModal';

var db = firebase.firestore();
const mapStateToProps = (state) => {
  return {
    mapCart: state.mapCart,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item) => {
      dispatch(addItem(item))
    }
  };
}
class VenScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uri: 'https://cdn.dribbble.com/users/1846841/screenshots/4961950/epi_x.png',
      mapCart: this.props.mapCart,
      menu: null,
      modalActive: false
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
    item.key = Math.random();
    // let tempCart = Object.assign([], this.props.cart);
    // tempCart.push(Object.assign({},item));
    this.props.addItem(item);
  }
  Subsection = () => {

  }
  render() {
    const headerContainerWidth = this.scrollY.interpolate({
      inputRange: [0, 125],
      outputRange: ['90%', '100%'],
      extrapolate: 'clamp'
    })

    const imageContainerHeight = this.scrollY.interpolate({
      inputRange: [-200, 0],
      outputRange: [450, 200],
      extrapolate: 'extend'
    })

    return (
      <>
        <Header noShadow iosBarStyle="light-content" style={{ paddingTop: 10, paddingLeft: 5, paddingBottom: 10, paddingRight: 5, height: 'auto', backgroundColor: "black", borderColor: "black" }}>
          
          <ScrollView horizontal>
            <Row>
              {this.state.menu && this.state.menu.sections[0].subsections.map((item, index) => (
                <Col key={index}>
                  <Button
                    key={index}
                    onPress={() => 
                      this.scrollViewRef.scrollTo({
                        y: this[index].y, animated: true
                      })
                    }
                    rounded
                    small
                    style={{ backgroundColor: "white" }}
                  >
                    <Text style={{ color: "black", fontFamily: "Avenir-Black" }}>{item.title}</Text>
                  </Button>
                </Col>
              ))}
            </Row>
          </ScrollView>
        </Header>
        <View style={styles.container}>
          <OptionsModal onSetItem={(item)=>this.onSetItem(item)} activeItem={this.state.activeItem} modalActive={this.state.modalActive}/>
          <Animated.View style={[styles.imageContainer, { height: imageContainerHeight }]}>
            <Image style={styles.image} source={{ uri: this.state.uri }} />
          </Animated.View>
          <ScrollView
            onScroll={
              Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }])
            }
            scrollEventThrottle={16}
            stickyHeaderIndices={[1]}
            style={styles.scrollViewContainer}
            ref={ref => (this.scrollViewRef = ref)}
          >
            <View style={styles.contentContainer}>
              {this.state.menu && this.state.menu.sections[0].subsections.map((item, index) => (
                <React.Fragment key={item.title}>
                  <View onLayout={event =>
                    this[index] = event.nativeEvent.layout
                  }>
                    <Card transparent>
                      <CardItem>
                        <Body>
                          <H3 style={{ fontFamily: "Avenir-Black" }}>{item.title}</H3>
                        </Body>
                      </CardItem>
                    </Card>
                  </View>
                  {item.items.map((field, index) => (
                    <TouchableOpacity key={field.title} onPress={() => {
                      this.setState({ modalActive: true, activeItem:field })
                    }}>
                      <View style={styles.item} key={field.external_id}>
                        <Card>
                          <CardItem header>
                            <Left>
                              <Text style={{ fontFamily: "Avenir" }}>{field.title}</Text>
                            </Left>
                          </CardItem>
                          <CardItem>
                            <Left style={{ alignItems: "bottom" }}>
                              <Tag><Text note style={{ fontFamily: "Avenir-LightOblique" }}>${field.price}</Text></Tag>
                              <Tag><Text numberOfLines={1} note style={{ fontFamily: "Avenir-LightOblique" }}>{field.item_description}</Text></Tag>
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
                <H1 style={{ textAlign: "center", fontFamily: "Avenir-Black" }}>{this.props.route.params.location.name}</H1>
              </Animated.View>
            </View>
          </ScrollView>

        </View>
      </>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(VenScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
    backgroundColor: '#fff'
  },
  image: {
    flex: 1
  },
  item: {
    margin: 10,
    backgroundColor: '#fff',
    height: "auto"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    height:"100%",
    width:"100%"
  },
  modalView: {
    backgroundColor: "white",
    alignItems: "center",
    height:"100%",
    width:"100%"
  },
  modalText: {
    textAlign: "center",
    fontFamily:"Avenir"
  }
})