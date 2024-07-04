import {StyleSheet} from 'react-native';
import {COLORS} from "@constants/colors";

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
  },
  listHeader: {
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
  },
  text: {
    color: COLORS.white,
  },
  blackText: {
    color: COLORS.black
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginVertical: 7,
    marginHorizontal: 3,
  },
  floatButton: {
    width: '95%',
    height: 50,
    borderRadius: 12,
    position: 'absolute',
    elevation: 10,
    backgroundColor: COLORS.primaryDark,
    bottom: 0,
    marginTop: 0,
  },
  fadingContainer: {
    width: '100%',
    height: 65,
    position: 'relative',
    backgroundColor: COLORS.transparent,
    elevation: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  progressStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1, 
    justifyContent: "center"
  },
  connectingText: {
    fontSize: 32,
    alignSelf: "center",
    textAlign: "center"
  }
});

export default styles;
