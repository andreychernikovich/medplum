import { StyleSheet } from 'react-native';
import { COLORS } from "@constants/colors";

const styles = StyleSheet.create({
  button: {
    height: 45,
    width: '70%',
    marginVertical: 4,
    borderRadius: 30,
    backgroundColor: COLORS.primaryDark,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.white,
    textAlign: 'center',
  },
});

export default styles;
