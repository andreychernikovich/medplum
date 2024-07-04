import {StyleSheet} from 'react-native';
import {fontSizeH6} from '../../constants/sizes';

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
  permListContainer: {
    alignContent: 'flex-start',
    width: '100%',
  },
  leftedText: {
    fontSize: fontSizeH6,
    textAlign: 'center',
    width: '70%',
  },
  image: {
    height: 250,
    width: 250,
    margin: 15,
    resizeMode: 'stretch',
  },
  bottomContainer: {flex: 2, width: '100%'},
  buttonContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
