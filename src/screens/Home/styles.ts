import { StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  contentContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
});

export default styles;
