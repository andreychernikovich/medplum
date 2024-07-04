import {StyleSheet} from 'react-native';
import {COLORS} from '@constants/colors';
import {fontSizeBody, fontSizeH5} from '../../../../constants/sizes';

export default StyleSheet.create({
  reverseButtonText: {
    textAlign: 'center',
    color: COLORS.white,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  permListContainer: {
    flex: 1,
    width: '100%',
  },
  attentionText: {
    fontSize: fontSizeH5,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
    color: COLORS.primaryDark,
  },
  leftedText: {
    fontSize: fontSizeBody,
    textAlign: 'left',
    padding: 4,
    paddingLeft: 16,
  },
  centerText: {
    fontSize: fontSizeBody,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
    paddingLeft: 8,
  },
  modalView: {
    height: 300,
    width: 300,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 2,
    flexDirection: 'column',
  },
  modalButtonsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: '5%',
    paddingBottom: 4,
  },
  buttonStyle: {
    width: 200,
    height: 45,
    borderRadius: 100500,
    marginBottom: 12,
    alignContent: 'center',
  },
});
