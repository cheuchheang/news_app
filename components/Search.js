import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { NewsContext } from "../API/Context";
import SingleNews from "./SingleNews";

const Search = () => {
  const {
    news: { articles },
  } = useContext(NewsContext);
  const [searchResults, setSearchResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentNews, setCurrentNews] = useState();
  const handleModal = (item) => {
    setModalVisible(true);
    setCurrentNews(item);
  };

  const handleSearch = (text) => {
    if (!text) {
      setSearchResults([]);
      return;
    }
    setSearchResults(articles.filter((query) => query.title.includes(text)));
  };
  return (
    <View style={{ width: "100%", position: "relative" }}>
      <TextInput
        style={{ ...styles.search, backgroundColor: "black", color: "white" }}
        onChangeText={(text) => handleSearch(text)}
        placeholder="Search for news"
        placeholderTextColor={"white"}
      />
      <View style={styles.searchResults}>
        {searchResults.slice(0, 10).map((item) => (
          <TouchableOpacity
            key={item.title}
            activeOpacity={0.7}
            onPress={() => handleModal(item)}
          >
            <Text
              style={{
                ...styles.singleResult,
                backgroundColor: "black",
                color: "white",
              }}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={{
            position: "absolute",
            zIndex: 2,
            right: 0,
            margin: 10,
            marginTop: 20,
          }}
        >
          <Entypo name="circle-with-cross" size={30} color={"white"} />
        </TouchableOpacity>
        <View style={{ height: "100%", transform: [{ scaleY: -1 }] }}>
          <SingleNews item={currentNews} />
        </View>
      </Modal>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  search: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 15,
    marginBottom: 15,
  },
  searchResults: {
    position: "absolute",
    zIndex: 1,
    top: 50,
  },
});
