import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  safeView: {
    flex: 1
  },
  drawerStyle: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 20,
    width: width * 0.7,
  },
  headerStyle: {
    height: 50,
    elevation: 0,
  },
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTitleContainerStyle: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
  },
  buttonContainerStyle: {width: 60},
});
export default styles;
