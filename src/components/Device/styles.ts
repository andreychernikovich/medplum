import {StyleSheet} from 'react-native';
import {COLORS} from '@constants/colors';

const styles = StyleSheet.create({
  mainContainer: {
    borderColor: COLORS.disabledBtn,
    borderBottomWidth: 1,
    borderRadius: 4,
    height: 52,
    marginHorizontal: 8,
  },

  lefContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  leftIcon: {
    width: 30,
    height: 30,
    marginRight: 12,
    marginLeft: 12,
    tintColor: COLORS.bluetoothColor,
  },
  midContainer: {
    justifyContent: 'space-around',
    width: "80%"
  },
  textname: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  textStatus: {
    fontWeight: 'normal',
    fontSize: 14,
  },
  connectButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rightIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
  },
  connectButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    margin: 4,
    backgroundColor: COLORS.transparent,
  },
});
export default styles;
