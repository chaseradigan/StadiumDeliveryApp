import React from 'react';
import firebase from "../firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import { View, Image, ImageBackground, StatusBar, RefreshControl, StyleSheet } from 'react-native';
import { Container, Card, CardItem, Left, Body, Icon, Right, Content, Text, Fab, H1, Grid, Row, Col, List, ListItem, Input, Item, Form, Label, Header } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import * as Animatable from "react-native-animatable";
import UberCard from './components/UberCard';
var db = firebase.firestore();
export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seat: {
                section: "400F",
                seatNumber: "11"
            },
            seatOpen: false,
            refreshing: false,
            locations: []
        }
    }
    componentDidMount() {
        StatusBar.setBarStyle('light-content');
        this.setUserDoc();
        this.getLocationsNearBy();
    }
    getLocationsNearBy() {
        let data = [];
        var locRef = db.collection("locations").doc("states").collection("WI").get().then(querySnapshot => {
            querySnapshot.forEach(function (doc) {
                //console.log(Array(doc.data()), "DOCDATA")
                data.push(doc.data());
            })
            this.setState({ locations: data })
        });
    }
    setUserDoc() {
        var userRef = db.collection("users").doc(firebase.auth().currentUser.uid);
        userRef
            .get()
            .then(doc => {
                if (!doc.exists) {
                    db.collection("users").doc(firebase.auth().currentUser.uid).set({
                        email: firebase.auth().currentUser.email
                    })
                }
            })
            .catch(function (error) {
                console.log("Error getting document:", error);
            });
    }
    handleSeat = () => {
        this.setState({ seatOpen: !this.state.seatOpen })
    }
    onRefresh = () => {
        this.setState({ refreshing: true });
        this.getLocationsNearBy();
        setTimeout(function () {
            this.setState({ refreshing: false })
        }.bind(this)), 2000
    }
    changeSeat = (e, name) => {

        let temp = this.state.seat;
        temp[name] = String(e.nativeEvent.text);
        this.setState({ seat: temp })
    }

    render() {
        const colors = ["#9697C8", "#9AD4C1", "#EFB891", "#E06A76", "#EED095", "#767676"]
        return (
            <Container>
                <StatusBar barStyle="light-content" backgroundColor="black" />
                <Content refreshing stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false} refreshControl={
                    <RefreshControl style={{ backgroundColor: "white" }} refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                }>
                    <View style={{ top: 0 }}>
                        <List style={{ backgroundColor: "rgba(0,0,0, 0.85)" }}>
                            <ListItem underlayColor="rgba(0,0,0,0.1)" selected={this.state.seatOpen} button onPress={this.handleSeat} noBorder>
                                <Left>
                                    <Icon style={{ fontSize: 20, color: 'red' }} name="ios-pin" />
                                    <Text style={{ color: "white", fontFamily: "Avenir" }}>
                                        Century Link Field
                                        {"\n"}
                                        <Text note style={{fontFamily:"Avenir-LightOblique"}}>
                                            Section:{" "}
                                        </Text>
                                        <Text note>
                                            {this.state.seat.section}{"   "}
                                        </Text>
                                        <Text note style={{fontFamily:"Avenir-LightOblique"}}>Seat:{" "}</Text>
                                        <Text note>{this.state.seat.seatNumber}</Text>
                                    </Text>

                                </Left>

                                <Right><Icon name="ios-arrow-dropdown" /></Right>
                            </ListItem>
                        </List>
                        {this.state.seatOpen ?
                            <Animatable.View duration={300} animation={"flipInX"}>
                                <Form style={{ backgroundColor: "rgba(0,0,0,0.80)" }}>
                                    <Item inlineLabel regular bordered={false} style={{ borderColor: "black", paddingLeft: 20 }}>
                                        <Label style={{ color: "white", fontFamily:"Avenir-Light", fontSize:14 }}>Section:</Label>
                                        <Input inlineLabel autoCapitalize="characters" value={this.state.seat.section}
                                            onChange={(e) => this.changeSeat(e, "section")} style={{ color: "white"}} selectionColor="red" placeholder="Section" />
                                        <Label style={{ color: "white", fontFamily:"Avenir-Light", fontSize:14 }}>Seat:</Label>
                                        <Input inlineLabel autoCapitalize="characters" value={this.state.seat.seatNumber}
                                            onChange={(e) => this.changeSeat(e, "seatNumber")} style={{ color: "white"}} selectionColor="red" inlineLabel="Section" placeholder="Seat" />
                                    </Item>
                                </Form>
                            </Animatable.View>
                            : <React.Fragment />}
                    </View>

                    <View>
                        <Grid>
                            <Card style={{ paddingBottom: 14, width: "100%" }}>
                                <CardItem header>
                                    <Text>Near By</Text>
                                </CardItem>
                                <Row >
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                        {this.state.locations.map((location, index) => (
                                            <UberCard key={index} {...this.props}
                                                location={location}
                                            />
                                        ))}
                                    </ScrollView>

                                </Row>
                            </Card>
                        </Grid>
                        <Card>
                            <CardItem header><Text>Popular Items</Text></CardItem>
                            <Row>
                                <Col style={styles.col}>
                                    <Card style={styles.foodCard}>
                                        <ImageBackground imageStyle={{ borderRadius: 15 }} source={require('../images/burger.jpg')} style={styles.imgBackground}>
                                            <CardItem activeOpacity={0.7} button onPress={() => this.props.navigation.push("Menu", {
                                                item: "burgers"
                                            })} style={{ height: "100%", backgroundColor: colors[5], borderRadius: 15, opacity: 0.85 }}>
                                                <Body style={styles.cardBody}>
                                                    <H1 style={styles.h1}>Burgers</H1>
                                                </Body>
                                            </CardItem>
                                        </ImageBackground>
                                    </Card>
                                </Col>
                                <Col style={styles.col}>
                                    <Card style={styles.foodCard}>
                                        <ImageBackground imageStyle={{ borderRadius: 15 }} source={require('../images/beer2.jpg')} style={styles.imgBackground}>
                                            <CardItem activeOpacity={0.7} button onPress={() => this.props.navigation.push("Menu", {
                                                item: "beer"
                                            })} style={{ height: "100%", backgroundColor: colors[2], borderRadius: 15, opacity: 0.85 }}>
                                                <Body style={styles.cardBody}>
                                                    <H1 style={styles.h1}>Beer</H1>
                                                </Body>
                                            </CardItem>
                                        </ImageBackground>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={styles.col}>
                                    <Card style={styles.foodCard}>
                                        <ImageBackground imageStyle={{ borderRadius: 15 }} source={require('../images/french-fries.jpg')} style={styles.imgBackground}>
                                            <CardItem activeOpacity={0.7} button onPress={() => this.props.navigation.push("Menu", {
                                                item: "frenchfries"
                                            })} style={{ height: "100%", backgroundColor: colors[4], borderRadius: 15, opacity: 0.85 }}>
                                                <Body style={styles.cardBody}>
                                                    <H1 style={styles.h1}>French Fries</H1>
                                                </Body>
                                            </CardItem>
                                        </ImageBackground>
                                    </Card>
                                </Col>
                                <Col style={styles.col}>
                                    <Card style={styles.foodCard}>
                                        <ImageBackground imageStyle={{ borderRadius: 15 }} source={require('../images/ice-cream.jpg')} style={styles.imgBackground}>
                                            <CardItem activeOpacity={0.7} button onPress={() => this.props.navigation.push("Menu", {
                                                item: "icecream"
                                            })} style={{ height: "100%", backgroundColor: colors[0], borderRadius: 15, opacity: 0.85 }}>
                                                <Body style={styles.cardBody}>
                                                    <H1 style={styles.h1}>Ice Cream</H1>
                                                </Body>
                                            </CardItem>
                                        </ImageBackground>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={styles.col}>
                                    <Card style={styles.foodCard}>
                                        <ImageBackground imageStyle={{ borderRadius: 15 }} source={require('../images/taco.jpg')} style={styles.imgBackground}>
                                            <CardItem activeOpacity={0.7} button onPress={() => this.props.navigation.push("Menu", {
                                                item: "tacos"
                                            })} style={{ height: "100%", backgroundColor: colors[3], borderRadius: 15, opacity: 0.85 }}>
                                                <Body style={styles.cardBody}>
                                                    <H1 style={styles.h1}>Tacos</H1>
                                                </Body>
                                            </CardItem>
                                        </ImageBackground>
                                    </Card>
                                </Col>
                                <Col style={styles.col}>
                                    <Card style={styles.foodCard}>
                                        <ImageBackground imageStyle={{ borderRadius: 15 }} source={require('../images/hotdog.jpg')} style={styles.imgBackground}>
                                            <CardItem activeOpacity={0.7} button onPress={() => this.props.navigation.push("Menu", {
                                                item: "hotdogs"
                                            })} style={{ height: "100%", backgroundColor: colors[1], borderRadius: 15, opacity: 0.85 }}>
                                                <Body style={styles.cardBody}>
                                                    <H1 style={styles.h1}>Hot Dogs</H1>
                                                </Body>
                                            </CardItem>
                                        </ImageBackground>
                                    </Card>
                                </Col>
                            </Row>
                        </Card>
                    </View>

                </Content>


                <View><Fab
                    position="bottomRight"
                    onPress={() => this.props.navigation.navigate("Map")}
                    style={{ backgroundColor: "black" }}

                >

                    <Icon name="ios-map" />
                </Fab></View>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    foodCard: {
        width: "100%", height: 150, borderRadius: 15, opacity: 0.85
    },
    textarea: {
        backgroundColor: "rgba(255,255,255,0.7)"
    },
    imgBackground: {
        width: "100%", height: "100%", flex: 1
    },
    cardBody: {
        flex: 1, justifyContent: "center", alignItems: "center"
    },
    h1: {
        textAlign: "center", color: "white", fontFamily: "Avenir-Medium"
    },
    col: {
        padding: 5, flex: 1, justifyContent: "center", alignItems: "center"
    }
})
