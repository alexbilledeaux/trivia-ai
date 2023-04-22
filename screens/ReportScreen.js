import React from "react";
import { useEffect, useState } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    FlatList,
    View,
    Text,
    SafeAreaView
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  initQuestionsDB,
  setupQuestionsListener
} from "../helpers/fb-questions";
  
const ReportScreen = ({ route, navigation }) => {

  const [reportedQuestions, setReportedQuestions] = useState([]);
  const [unreportedQuestions, setUnreportedQuestions] = useState([]);

  useEffect(() => {
    try {
      initQuestionsDB();
    } catch (error) {
      console.log(error);
    }
    setupQuestionsListener((questions) => {
      let reported = [];
      let unreported = [];
      for (const question in questions) {
        if (!questions[question].reported) {
          unreported.push(questions[question]);
        } else {
          reported.push(questions[question]);
        }
      }
      setReportedQuestions(reported);
      setUnreportedQuestions(unreported);
    })
  }, []);

  const renderFlatList = (listQuestions) => {
    return <FlatList
      style={styles.screen}
      keyExtractor={(item) => `${item.id}`}
      data={listQuestions}
      ItemSeparatorComponent={FlatListItemSeparator}
      renderItem={({ index, item }) => {
        return (
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("ReviewQuestion", {
                questionObj: item,
              })
            }
          >
            <Text style={styles.buttonTextHeader}>Question:</Text>
            <Text style={styles.buttonText}>{item.question.question}</Text>
          </TouchableOpacity>
        );
      }}
    />
  }

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 15,
          width: "100%"
        }}
      />
    );
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.headline}>Reported Questions</Text>
          <Text style={styles.bodyText}>These won't show up in your trivia again.</Text>
          {renderFlatList(reportedQuestions)}
          <Text style={styles.headline}>Recent Questions</Text>
          <Text style={styles.bodyText}>Select a question to report it as innacurate or inappropriate.</Text>
          {renderFlatList(unreportedQuestions)}
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
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20
  },
  subheadline: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5
  },
  bodyText: {
    color: "#fff",
    marginBottom: 15,
    fontSize: 16
  },
  button: {
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 5
  },
  buttonTextHeader: {
    color: "black",
    fontWeight: "bold"
  },
  buttonText: {
    color: "black",
    fontSize: 15
  }
});

export default ReportScreen;
