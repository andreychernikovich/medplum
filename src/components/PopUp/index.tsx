import { Modal, View } from "react-native";

import CustomButton from "@components/CustomButton";
import style from "./styles";

type Props = {
  modalVisible: boolean;
  hideModal: () => void;
  children: React.ReactNode;
};

export const PopUp = ({ modalVisible, hideModal, children }: Props) => {
  return (
    <Modal
      testID="modal"
      animationType="fade"
      transparent={false}
      visible={modalVisible}
      statusBarTranslucent={true}
      onRequestClose={hideModal}
    >
      <View style={style.container}>
        <CustomButton
          styles={style.button}
          onPress={hideModal}
          title="Close"
          titleStyle={style.title}
        />
        {children}
      </View>
    </Modal>
  );
};
