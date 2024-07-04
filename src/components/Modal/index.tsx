import { useTheme } from "@react-navigation/native";
import React from "react";
import { Modal, Text, View, ScrollView } from "react-native";
import i18n from "@i18n/index";

import CustomButton from "@components/CustomButton";
import { styles } from "./styles";

type Props = {
  modalVisible: boolean;
  setModalVisible: (data: boolean) => void;
  message: string;
};

const ModalComponent = ({ modalVisible, setModalVisible, message }: Props) => {
  const { colors } = useTheme();

  const closeModal = () => {
    setModalVisible((prev) => !prev);
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <ScrollView
            contentContainerStyle={[
              styles.modalView,
              { backgroundColor: colors.card },
            ]}
          >
            <Text style={[styles.modalText, { color: colors.text }]}>
              {message}
            </Text>
            <CustomButton
              styles={styles.button}
              onPress={() => setModalVisible(false)}
              titleStyle={styles.textStyle}
              title={i18n.t("buttons.hide")}
            />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default ModalComponent;
