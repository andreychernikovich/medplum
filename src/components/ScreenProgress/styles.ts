import {StyleSheet} from 'react-native';
import {notFocusedColor} from '../../constants/colors';

const styles = StyleSheet.create({
  normalDot: {
    height: 8,
    width: 16,
    borderRadius: 8,
    backgroundColor: notFocusedColor,
    margin: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
