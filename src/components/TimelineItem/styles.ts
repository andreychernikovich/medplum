import { StyleSheet } from "react-native";
import { COLORS } from "@constants/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16, 
    width: "90%",
    paddingVertical: 14,
    borderColor: COLORS.primaryDark,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    alignSelf: "center"
  },
  iconContainer: {
    marginHorizontal: 8,
  },
  dataContainer: {
    paddingRight: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  textContainer: {
    flex: 1,
    alignSelf: "flex-start",
    paddingRight: 12,
  },
  title: {
    fontSize: 20,
    color: COLORS.black,
  },
  comment: {
    fontSize: 16,
    color: COLORS.black,
  },
  subtitle: {
    fontSize: 30,
    color: COLORS.black,
  },
  date: {
    textAlign: "right",
    fontSize: 16,
    fontWeight: "600",
  },
  time: {
    textAlign: "right",
    fontSize: 14,
  },
  moreLess: {
    color: COLORS.primaryDark,
    marginTop: 6,
    fontWeight: "600",
    textAlign: "right",
  },
});

export default styles;
