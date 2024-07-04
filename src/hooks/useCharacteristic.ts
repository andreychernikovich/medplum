import {createContext, useContext} from 'react';
import { Characteristic } from 'react-native-ble-plx';

export const CharacteristicContext = createContext<Characteristic[]>([]);
const useCharacteristic = () => useContext(CharacteristicContext);
export default useCharacteristic;
