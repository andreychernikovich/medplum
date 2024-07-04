import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Snackbar } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useMedplum, useMedplumProfile } from "@medplum/react-hooks";
import { useFocusEffect } from "@react-navigation/native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import ProfileTextInput from "@components/ProfileTextInput";
import CustomButton from "@components/CustomButton";
import { COLORS } from "@constants/colors";
import { PatientResource, ResourceType } from "@src/types/index";
import { formatBirthDate } from "@utils/date";
import { trackLog } from "@utils/trackLog";
import i18n from "@i18n/index";
import styles from "./styles";

const EditProfile = () => {
  const medplum = useMedplum();
  const {address, birthDate, name, telecom, id} = useMedplumProfile();
  const [firstName, setFirstName] = useState(name[0]?.given[0]);
  const [lastName, setLastName] = useState(name[0]?.family);
  const [date, setDate] = useState(birthDate);
  const [city, setCity] = useState(address?.[0]?.city);
  const [email, setEmail] = useState(telecom[0]?.value);
  const [saveError, setSaveError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visibleSnackBar, setVisibleSnackBar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(birthDate ? new Date(birthDate) : new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  useEffect(() => {
    setSaveError("");
  }, [firstName, lastName, date, city]);

  useFocusEffect(
    useCallback(() => {
      getProfile();
    }, []),
  );

  const getProfile = async () => {
    try {
      const profile: PatientResource = await medplum.readResource(ResourceType.Patient, id);
        setFirstName(profile?.name[0]?.given[0]);
        setLastName(profile?.name[0]?.family);
        setCity(profile?.address?.[0]?.city);
        setDate(profile?.birthDate);
        setEmail(profile?.telecom[0]?.value);
        setSelectedDate(profile?.birthDate ? new Date(profile?.birthDate) : new Date());
    } catch(error) {
      trackLog<Error>("error in read resource", error);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(formatBirthDate(date));
    setSelectedDate(date);
    hideDatePicker();
  };

  const onEditSave = () => {
    const patient: PatientResource = {
      resourceType: ResourceType.Patient,
      id: id,
      name: [
        {
          family: lastName,
          given: [firstName],
        },
      ],
      address: [
        {
          city: city ?? "",
        },
      ],
      birthDate: date ?? "",
      telecom: [
        {
          value: email
        }
      ]
    };

      updateUserData(patient);
  };

  const updateUserData = async (patient: PatientResource | undefined) => {
    try {
      setIsLoading(true);
      const result: PatientResource | undefined = await medplum.updateResource(patient);
      if(result) {
        setFirstName(result.name[0]?.given[0]);
        setLastName(result.name[0]?.family);
        setDate(result.birthDate);
        setCity(result.address[0]?.city);
      };
      setVisibleSnackBar(true);
    }
    catch(error){
      setSaveError(error.message);
    }
    finally{
      setIsLoading(false);
    };
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.inputsContainer}>
          <ProfileTextInput
            value={firstName}
            title={i18n.t("signup.firstName")}
            onChangeText={setFirstName}
          />
          <ProfileTextInput
            value={lastName}
            title={i18n.t("signup.lastName")}
            onChangeText={setLastName}
          />
          <ProfileTextInput
            value={date}
            title={i18n.t("profile.birthDate")}
            rightIcon="calendar-outline"
            isEditable={false}
            onRightIconPress={showDatePicker}
          />
          <ProfileTextInput
            value={city}
            title={i18n.t("profile.city")}
            onChangeText={setCity}
          />
          <ProfileTextInput
            value={email}
            title={i18n.t("common.email")}
            contentStyle={styles.email}
            isEditable={false}
            onChangeText={setEmail}
          />
          <CustomButton
            title={i18n.t("profile.save")}
            onPress={onEditSave}
            styles={styles.button}
            error={saveError}
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
      <DateTimePickerModal
        date={selectedDate}
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Snackbar
        visible={visibleSnackBar}
        onDismiss={() => setVisibleSnackBar(false)}
        style={styles.snackBar}
        duration={2000}
      >
        {i18n.t("profile.updatedSuccessfully")}
      </Snackbar>
      <StatusBar style="auto" backgroundColor={COLORS.white} />
    </View>
  );
};

export default EditProfile;

