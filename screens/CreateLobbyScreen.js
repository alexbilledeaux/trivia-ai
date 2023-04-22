import React from "react";
import {
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    Text,
    Image,
    TouchableOpacity
  } from "react-native";
import { Feather, MaterialCommunityIcons, Octicons, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
  
const Trifles_CreateLobby = require('../assets/Trifles_CreateLobby.png');
  
const CreateLobbyScreen = ({ route, navigation }) => {

  return (
      <TouchableWithoutFeedback>
        <View style={styles.container}>
            <Image
                source={Trifles_CreateLobby}
                style={styles.triflesImage}
            />
            <Text style={styles.headline}>Pick your topic!</Text>
            <View style={styles.buttonGrid}>
                <View style={styles.buttonRow}>
                    <View style={styles.buttonColumn}>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("Lobby", {
                                    category: "ai-category",
                                })
                            }
                        >
                            <MaterialCommunityIcons style={styles.topicIcon} name="robot-excited-outline" size={24} color="#fff"></MaterialCommunityIcons>
                            <Text style={styles.topicText}>AI Generated</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonColumn}>
                        <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("Lobby", {
                                category: "entertainment",
                            })
                        }
                        >
                            <Feather style={styles.topicIcon} name="tv" size={24} color="#fff"></Feather>
                            <Text style={styles.topicText}>Entertainment</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonColumn}>
                        <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("Lobby", {
                                category: "science",
                            })
                        }
                        >
                            <Octicons style={styles.topicIcon} name="beaker" size={24} color="#fff"></Octicons>
                            <Text style={styles.topicText}>Science</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.buttonRow}>
                    <View style={styles.buttonColumn}>
                        <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("Lobby", {
                                category: "sports",
                            })
                        }
                        >
                            <Ionicons style={styles.topicIcon} name="ios-baseball-outline" size={24} color="#fff"></Ionicons>
                            <Text style={styles.topicText}>Sports</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonColumn}>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("Lobby", {
                                    category: "geography",
                                })
                            }
                        >
                            <SimpleLineIcons style={styles.topicIcon} name="globe-alt" size={24} color="#fff"></SimpleLineIcons>
                            <Text style={styles.topicText}>Geography</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonColumn}>
                        <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("Lobby", {
                                category: "history",
                            })
                        }
                        >
                            <Octicons style={styles.topicIcon} name="hourglass" size={24} color="#fff"></Octicons>
                            <Text style={styles.topicText}>History</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
      </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 35,
        paddingBottom: 35,
        maxWidth: 675,
        margin: "auto"
    },
    headline: {
        color: "#fff",
        fontSize: 34,
        fontWeight: "bold",
        paddingLeft: 20
    },
    topicIcon: {
        textAlign: "center",
        paddingBottom: 10
    },
    topicText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold"
    },
    triflesImage: {
        width: 350,
        height: 260,
        margin: "auto"
    },
    buttonGrid: {
        marginTop: 20
    },
    buttonRow: {
        display: "flex",
        flexDirection: "row"
    },
    buttonColumn: {
        padding: 15
    }
});

export default CreateLobbyScreen;
  