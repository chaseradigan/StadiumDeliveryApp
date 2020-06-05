import React from 'react';
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import { Container, Content, Button, Text } from 'native-base';
import menu from "./menu.json";
const data = {
    words: [
        'Bar',
        'Fire',
        'Grill',
        'Drive Thru',
        'Place',
        'Best',
        'Spot',
        'Prime',
        'Eatin\''
    ],
    states: [
        {
            name: "Alabama",
            abbreviation: "AL"
        },
        {
            name: "Alaska",
            abbreviation: "AK"
        },
        {
            name: "American Samoa",
            abbreviation: "AS"
        },
        {
            name: "Arizona",
            abbreviation: "AZ"
        },
        {
            name: "Arkansas",
            abbreviation: "AR"
        },
        {
            name: "California",
            abbreviation: "CA"
        },
        {
            name: "Colorado",
            abbreviation: "CO"
        },
        {
            name: "Connecticut",
            abbreviation: "CT"
        },
        {
            name: "Delaware",
            abbreviation: "DE"
        },
        {
            name: "District Of Columbia",
            abbreviation: "DC"
        },
        {
            name: "Federated States Of Micronesia",
            abbreviation: "FM"
        },
        {
            name: "Florida",
            abbreviation: "FL"
        },
        {
            name: "Georgia",
            abbreviation: "GA"
        },
        {
            name: "Guam",
            abbreviation: "GU"
        },
        {
            name: "Hawaii",
            abbreviation: "HI"
        },
        {
            name: "Idaho",
            abbreviation: "ID"
        },
        {
            name: "Illinois",
            abbreviation: "IL"
        },
        {
            name: "Indiana",
            abbreviation: "IN"
        },
        {
            name: "Iowa",
            abbreviation: "IA"
        },
        {
            name: "Kansas",
            abbreviation: "KS"
        },
        {
            name: "Kentucky",
            abbreviation: "KY"
        },
        {
            name: "Louisiana",
            abbreviation: "LA"
        },
        {
            name: "Maine",
            abbreviation: "ME"
        },
        {
            name: "Marshall Islands",
            abbreviation: "MH"
        },
        {
            name: "Maryland",
            abbreviation: "MD"
        },
        {
            name: "Massachusetts",
            abbreviation: "MA"
        },
        {
            name: "Michigan",
            abbreviation: "MI"
        },
        {
            name: "Minnesota",
            abbreviation: "MN"
        },
        {
            name: "Mississippi",
            abbreviation: "MS"
        },
        {
            name: "Missouri",
            abbreviation: "MO"
        },
        {
            name: "Montana",
            abbreviation: "MT"
        },
        {
            name: "Nebraska",
            abbreviation: "NE"
        },
        {
            name: "Nevada",
            abbreviation: "NV"
        },
        {
            name: "New Hampshire",
            abbreviation: "NH"
        },
        {
            name: "New Jersey",
            abbreviation: "NJ"
        },
        {
            name: "New Mexico",
            abbreviation: "NM"
        },
        {
            name: "New York",
            abbreviation: "NY"
        },
        {
            name: "North Carolina",
            abbreviation: "NC"
        },
        {
            name: "North Dakota",
            abbreviation: "ND"
        },
        {
            name: "Northern Mariana Islands",
            abbreviation: "MP"
        },
        {
            name: "Ohio",
            abbreviation: "OH"
        },
        {
            name: "Oklahoma",
            abbreviation: "OK"
        },
        {
            name: "Oregon",
            abbreviation: "OR"
        },
        {
            name: "Palau",
            abbreviation: "PW"
        },
        {
            name: "Pennsylvania",
            abbreviation: "PA"
        },
        {
            name: "Puerto Rico",
            abbreviation: "PR"
        },
        {
            name: "Rhode Island",
            abbreviation: "RI"
        },
        {
            name: "South Carolina",
            abbreviation: "SC"
        },
        {
            name: "South Dakota",
            abbreviation: "SD"
        },
        {
            name: "Tennessee",
            abbreviation: "TN"
        },
        {
            name: "Texas",
            abbreviation: "TX"
        },
        {
            name: "Utah",
            abbreviation: "UT"
        },
        {
            name: "Vermont",
            abbreviation: "VT"
        },
        {
            name: "Virgin Islands",
            abbreviation: "VI"
        },
        {
            name: "Virginia",
            abbreviation: "VA"
        },
        {
            name: "Washington",
            abbreviation: "WA"
        },
        {
            name: "West Virginia",
            abbreviation: "WV"
        },
        {
            name: "Wisconsin",
            abbreviation: "WI"
        },
        {
            name: "Wyoming",
            abbreviation: "WY"
        }
    ],
    categories: [
        'Brunch',
        'Burgers',
        'Coffee',
        'Deli',
        'Dim Sum',
        'Indian',
        'Italian',
        'Mediterranean',
        'Mexican',
        'Pizza',
        'Ramen',
        'Sushi'
    ],
    ratings: [
        {
            rating: 1,
            text: 'Would never eat here again!'
        },
        {
            rating: 2,
            text: 'Not my cup of tea.'
        },
        {
            rating: 3,
            text: 'Exactly okay :/'
        },
        {
            rating: 4,
            text: 'Actually pretty good, would recommend!'
        },
        {
            rating: 5,
            text: 'This is my favorite place. Literally.'
        }
    ]
};
import firebase from "./firebase";
import uuid from 'react-native-uuid';
var db = firebase.firestore();

export default class MockData extends React.Component {
    constructor() {
        super();
    }
    getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    };
    addMockRestaurant() {
        for (var i = 0; i < 20; i++) {
            var name =
                this.getRandomItem(data.words) +
                ' ' +
                this.getRandomItem(data.words);
            var category = this.getRandomItem(data.categories);
            var state = this.getRandomItem(data.states);
            var price = Math.floor(Math.random() * 4) + 1;
            var photoID = Math.floor(Math.random() * 22) + 1;
            var photo = 'https://storage.googleapis.com/firestorequickstarts.appspot.com/food_' + photoID + '.png';
            var numRatings = 0;
            var avgRating = 0;
            let dollarSigns = ''
            for (let i = 0; i < price; i++) {
                dollarSigns = dollarSigns + '$';
            }
            this.addRestaurant({
                name: name,
                category: category,
                price: dollarSigns,
                state: state,
                numRatings: numRatings,
                avgRating: avgRating,
                time: `${price} mins`,
                photo: photo,
                id: uuid.v4()
            });
        }
    }
    addRestaurant(restaurant) {
        //console.log(restaurant)
        var userRef = db.collection("locations").doc("states").collection(restaurant.state.abbreviation).doc(restaurant.id);
        userRef
            .get()
            .then(doc => {
                if (doc.exists)
                    console.log("restaurant doc retrieved");
                else {
                    userRef.set(restaurant);
                }
            })
            .catch(function (error) {
                console.log("Error getting document:", error);
            });
        var menusRef = db.collection("locations").doc("menus").collection(restaurant.state.abbreviation).doc(restaurant.id);
        menusRef.get().then(doc => {
            if (doc.exists) {
                console.log("ratings exist");
            } else {
                menusRef.set(menu);
            }
        })
    }
    render() {
        return (
            <Container>
                <Content>
                    <Button onPress={() => this.addMockRestaurant()}><Text>Add Mock Data</Text></Button>
                </Content>
            </Container>
        )
    }
}