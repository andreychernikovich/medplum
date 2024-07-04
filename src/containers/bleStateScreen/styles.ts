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
  },
  image: {
    height: 270,
    width: 270,
    resizeMode: 'stretch',
  },
  bottomContainer: {flex: 2, width: '100%'},
  buttonContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 45,
    width: '70%',
    backgroundColor: COLORS.primaryDark,
    marginVertical: 4,
    borderRadius: 30,
    alignSelf: "center"
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.white,
    textAlign: 'center',
  },
});

export default styles;
