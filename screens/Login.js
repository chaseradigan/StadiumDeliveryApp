import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import firebase from "../firebase";
import "firebase/auth";
import {
    Item,
    Input,
    Form,
    Content,
    Container,
    Button,
    Text,
    Icon
} from "native-base";
export default class LoginScreen extends React.Component {
    state = { email: "", password: "", errorMessage: null };
    handleLogin = () => {
        try {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password);
                
        } catch (error) {
            this.setState({ errorMessage: error });
        }
    };
    render() {
        return (
            <Container>
                <Content
                    contentContainerStyle={{
                        justifyContent: "center",
                        flex: 1,
                        margin: 10
                    }}
                    scrollEnabled={false}
                >
                    <Form>
                        <Item rounded>
                            <Input
                                style={{ marginLeft: 10 }}
                                autoCapitalize="none"
                                placeholder="Email"
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                            />
                        </Item>
                        <Item rounded style={{ marginTop: 20, marginBottom: 20 }}>
                            <Input
                                style={{ marginLeft: 10 }}
                                secureTextEntry
                                autoCapitalize="none"
                                placeholder="Password"
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}
                            />
                        </Item>
                    </Form>
                    <Button
                        rounded
                        block
                        dark
                        onPress={this.handleLogin}
                        style={{
                            marginTop: 20,
                            marginBottom: 20,
                            marginRight: 40,
                            marginLeft: 40
                        }}
                       
                    >
                        <Text>Login</Text>
                    </Button>
                    <View style={{ alignItems: "center" }}>
                        <Text>Don't have an account?</Text>
                        <Button
                            info
                            transparent
                            onPress={() => this.props.navigation.navigate("SignUp")}
                            style={{
                                marginTop: 10,
                                alignSelf: "center"
                            }}
                        >
                            <Text>Sign Up</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textInput: {
        height: 40,
        width: "80%",
        paddingTop: 15,
        paddingBottom: 15
    }
});