import { StyleSheet, Text, View, StatusBar } from "react-native";
import InShortTabs from "./components/InShortTabs";

export default function App() {
  return (
    <View style={{...styles.container,backgroundColor: "#282C35"}}>
      <InShortTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
