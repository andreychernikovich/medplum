import {StyleSheet} from 'react-native';
import {COLORS} from "@constants/colors";

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    width: '100%',
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    width: '70%',
  },
  image: {
    height: 230,
    width: 230,
    margin: 25,
    resizeMode: 'stretch',
    tintColor: COLORS.primaryDark,
  },
  bottomContainer: {flex: 2, width: '100%', },
  buttonContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
