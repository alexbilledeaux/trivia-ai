import React from "react";
import { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import Padder from "../components/Padder";
import { fetchQuestions } from "../helpers/ot-questions";
import { fetchOpenAiQuestions } from "../helpers/gpt-questions";
import { ScrollView } from "react-native-gesture-handler";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    SafeAreaView,
    TouchableOpacity
  } from "react-native";

import {
  initQuestionsDB,
  setupQuestionsListener,
  storeQuestion
} from "../helpers/fb-questions";

const Trifles_Lobby = require('../assets/Trifles_Lobby.png');
const Trifles_Waiting = require('../assets/Trifles_Waiting.png');
const Trifles_NoResponse = require('../assets/Trifles_NoResponse.png');
  
const LobbyScreen = ({ route, navigation }) => {

  const { category } = route.params;
  const [aiCategory, setAiCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [reportedQuestions, setReportedQuestions] = useState([]);
  const [triflesImage, setTriflesImage] = useState(Trifles_Lobby);

  const [selectedLobbyCategory, setSelectedLobbyCategory] = useState(category);
  const [lobbyCategory, setLobbyCategory] = useState([
    { label: "AI Generated", value: "ai-category", containerStyle: styles.itemContainer},
    { label: "entertainment", value: "entertainment", containerStyle: styles.itemContainer },
    { label: "science", value: "science", containerStyle: styles.itemContainer },
    { label: "sports", value: "sports", containerStyle: styles.itemContainer },
    { label: "geography", value: "geography", containerStyle: styles.itemContainer },
    { label: "history", value: "history", containerStyle: styles.itemContainer },
  ]);
  const [openCategory, setOpenCategory] = useState(false);

  const [selectedLobbyDifficulty, setSelectedLobbyDifficulty] = useState("medium");
  const [lobbyDifficulty, setLobbyDifficulty] = useState([
    { label: "easy", value: "easy", containerStyle: styles.itemContainer },
    { label: "medium", value: "medium", containerStyle: styles.itemContainer },
    { label: "hard", value: "hard", containerStyle: styles.itemContainer },
  ]);
  const [openDifficulty, setOpenDifficulty] = useState(false);

  const [selectedGameMode, setSelectedGameMode] = useState("classic");
  const [gameMode, setGameMode] = useState([
    { label: "Casual", value: "casual", containerStyle: styles.itemContainer },
    { label: "Classic", value: "classic", containerStyle: styles.itemContainer },
    { label: "Knockout", value: "knockout", containerStyle: styles.itemContainer },
  ]);
  const [openGameMode, setOpenGameMode] = useState(false);

  const launchGame = () => {
    setLoading(true);
    setTriflesImage(Trifles_Waiting)
    // Determine which API we need to query from
    if (selectedLobbyCategory != "ai-category") {
      fetchQuestions(selectedLobbyCategory, selectedLobbyDifficulty, reportedQuestions, 6)
        .then((output) => {
          setLoading(false);
          setTriflesImage(Trifles_Lobby);
          // Store the trivia questions in the database
          for (const question in output) {
            storeQuestion({ question: output[question], timestamp: Date.now(), reported: false });
          }
          navigation.navigate("Trivia", {
            questions: output,
            gameMode: selectedGameMode
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      fetchOpenAiQuestions(aiCategory, selectedLobbyDifficulty, reportedQuestions, 6)
        .then((output) => {
          setLoading(false);
          // Don't crash on API failure
          if (output) {
            setTriflesImage(Trifles_Lobby);
            // Store the trivia questions in the database
            for (const question in output) {
              storeQuestion({ question: output[question], timestamp: Date.now(), reported: false });
            }
            navigation.navigate("Trivia", {
              questions: output,
              gameMode: selectedGameMode
            });
          } else {
            setTriflesImage(Trifles_NoResponse);
            console.log("Failed to get questions");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  useEffect(() => {
    try {
      initQuestionsDB();
    } catch (error) {
      console.log(error);
    }
    setupQuestionsListener((questions) => {
      let rq = [];
      for (const question in questions) {
        if (questions[question].reported) {
          rq.push(questions[question]);
        }
      }
      setReportedQuestions(rq);
    })
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={triflesImage}
            style={styles.triflesImage}
          />
          <Text style={styles.headline}>Trivia Lobby</Text>
          {selectedLobbyCategory == "ai-category" ?
            <TextInput
              style={styles.textInput}
              onChangeText={setAiCategory}
              placeholder="Enter your trivia topic..."
              value={aiCategory}
            /> :
            <React.Fragment></React.Fragment>
          }
          <DropDownPicker
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            labelStyle={styles.dropdownLabel}
            open={openCategory}
            value={selectedLobbyCategory}
            items={lobbyCategory}
            setOpen={setOpenCategory}
            setValue={setSelectedLobbyCategory}
            setItems={setLobbyCategory}
            disabled={loading}
            zIndex={3000}
          />
          <Padder />
          <DropDownPicker
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            labelStyle={styles.dropdownLabel}
            open={openDifficulty}
            value={selectedLobbyDifficulty}
            items={lobbyDifficulty}
            disabled={loading}
            setOpen={setOpenDifficulty}
            setValue={setSelectedLobbyDifficulty}
            setItems={setLobbyDifficulty}
            zIndex={2000}
          />
          <Padder />
          <DropDownPicker
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            labelStyle={styles.dropdownLabel}
            open={openGameMode}
            value={selectedGameMode}
            disabled={loading}
            items={gameMode}
            setOpen={setOpenGameMode}
            setValue={setSelectedGameMode}
            setItems={setGameMode}
            zIndex={1000}
          />
          <Padder />
          <TouchableOpacity
              style={styles.button}
              onPress={launchGame}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Go to Trivia!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    fontWeight: "bold",
    marginBottom: 15
  },
  triflesImage: {
    width: 320,
    height: 240,
    marginBottom: 30,
    margin: "auto"
  },
  dropdownContainer: {
    
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    padding: 9
  },
  dropdownText: {
    textTransform: "capitalize",
    paddingTop: 4,
    paddingBottom: 4,
    flexDirection: "row"
  },
  dropdownLabel: {
    fontWeight: "bold"
  },
  itemContainer: {
    flexDirection: "row",
    padding: 5
  },
  textInput: {
    backgroundColor: "#fff",
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 5,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10
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

export default LobbyScreen;
  