import React from 'react'
import { Platform, View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native'

import Tag from './Tag'
import { Ionicons } from '@expo/vector-icons';

export default class Card extends React.Component {
  constructor(props) {
    super(props)
    this.heartSize = new Animated.Value(1);
    this.state = {
      liked: false
    }
  }

  like() {
    this.setState({ liked: true })
    Animated.spring(this.heartSize, {
      toValue: 1.1,
      friction: 1
    }).start()
  }

  unlike() {
    this.setState({ liked: false })
    this.heartSize.setValue(1)
  }

  render() {
    return (
      <View style={this.props.style}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('Venue',{item:this.props.name})}>
          <View style={styles.container}>
            <View>
              <Image style={styles.image} source={{ uri: 'https://cdn.dribbble.com/users/1846841/screenshots/4961950/epi_x.png' }} />
              <TouchableOpacity
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                activeOpacity={0.7}
                onPress={() => this.state.liked ? this.unlike() : this.like()}
                style={styles.iconContainer}
              >
                <Animated.View style={{ transform: [{ scale: this.heartSize }] }}>
                  <Ionicons
                    name={(Platform.OS === 'ios' ? 'ios-heart' : 'md-heart') + (this.state.liked ? '' : '-empty')}
                    size={32}
                    color="#fff"
                  />
                </Animated.View>
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>{this.props.name}</Text>
            <Text style={styles.description}>{this.props.pricing}</Text>
            <View style={styles.tagContainer}>
              <Tag>{this.props.wait}</Tag>
              <Tag>{this.props.rating}</Tag>
              <Tag>{this.props.location}</Tag>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    width: 320,
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5
  },
  image: {
    height: 150
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  title: {
    fontSize: 16,
    marginTop: 10
  },
  description: {
    color: '#999',
    marginTop: 5
  },
  iconContainer: {
    position: 'absolute',
    right: 20,
    bottom: 15
  }
})