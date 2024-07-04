import {StyleSheet} from 'react-native';
import {COLORS} from '@constants/colors';
import {height} from '@constants/sizes';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  modalView: {
    height: 200,
    marginVertical: height / 2 - 100,
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    elevation: 4,
  },
  button: {
    borderRadius: 20,
    elevation: 2,
    backgroundColor: COLORS.primaryDark,
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 24,
    textAlign: 'center',
  },
});
