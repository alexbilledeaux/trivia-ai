import React from "react";
import { useEffect } from "react";
import {
    Keyboard,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Platform
  } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const TriflesMain = require('../assets/Trifles_Main.png');
  
const HomeScreen = ({ route, navigation }) => {

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Report", {})
          }
        >
          <Feather
            style={{ marginRight: 10 }}
            name="flag"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      ),
    });
  });



  return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Image
                source={TriflesMain}
                style={styles.triflesImage}
              />
              <Text style={styles.headline}>
                AI-Powered Trivia App For Any Subject
              </Text>
              <Text style={styles.bodyCopy}>
                Gone are the days of subjects like <Text style={styles.innerText}>entertainment</Text> or <Text style={styles.innerText}>history</Text>, how about <Text style={styles.innerText}>Cartoons of the 90s</Text> or <Text style={styles.innerText}>Medieval History of Spain</Text>?
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate("Create Lobby", {})
                }
              >
                <Text style={styles.buttonText}>Start your game</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    marginBottom: 35,
    marginLeft: 15,
    marginRight: 15
  },
  headline: {
    color: "#fff",
    fontSize: 44,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 15
  },
  bodyCopy: {
    color: "#fff",
    fontSize: 20,
    textAlign: "left",
    marginBottom: 25
  },
  innerText: {
    fontStyle: "italic",
    fontWeight: "bold"
  },
  triflesImage: {
    width: 350,
    height: 420,
    margin: "auto"
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: "#05B7FD",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20
  }
});

export default HomeScreen;
  