import React from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity
} from "react-native";

const EndScreen = ({ route, navigation }) => {

  const { victory, correctAnswers } = route.params;

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <Text style={styles.headline}>{victory ? "You Win! Nice work." : "You Lose! You'll get it next time."}</Text>
        <Text style={styles.correctAnswers}>Correct Answer: {correctAnswers}</Text>
        <TouchableOpacity
                style={styles.button}
                onPress={()=>{
                  navigation.navigate("Lobby", {
                    
                  });
                }}
              >
                <Text style={styles.buttonText}>Back to the Lobby</Text>
          </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
    textAlign: "center"
  },
  headline: {
    fontSize: 40,
    color: "#fff",
    marginBottom: 10,
    fontWeight: "bold"
  },
  correctAnswers: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 30
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

export default EndScreen;
