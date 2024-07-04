import React, { useCallback, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useMedplum, useMedplumProfile } from "@medplum/react-hooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { LOGIN_CODE, LOGIN_VALUE } from "@constants/storage";
import { storage } from "@utils/storage";
import { trackLog } from "@utils/trackLog";
import Subtitle from "@components/Subtitle";
import ProfileRowItem from "@components/ProfileRowItem";
import { ProfileStackParamList } from "@src/types/navigation";
import { PatientResource, ResourceType } from "@src/types/index";
import { EDIT_PROFILE, SETTINGS } from "@constants/screens";
import { COLORS } from "@constants/colors";
import i18n from "@i18n/index";
import styles from "./styles";

type Props = {
  navigation: NativeStackNavigationProp<
    ProfileStackParamList,
    typeof EDIT_PROFILE
  >;
};

const Profile = (props: Props) => {
  const medplum = useMedplum();
  const {address, birthDate, name, id} = useMedplumProfile();
  const [firstName, setFirstName] = useState(name[0]?.given[0]);
  const [lastName, setLastName] = useState(name[0]?.family);
  const [date, setDate] = useState(birthDate);
  const [city, setCity] = useState(address?.[0]?.city);

  useFocusEffect(
    useCallback(() => {
      getProfile();
    }, [])
  );

  const goToEditProfile = () => {
    props.navigation.navigate(EDIT_PROFILE);
  };

  const goToSettings = () => {
    props.navigation.navigate(SETTINGS);
  };

  const getProfile = async () => {
    try {
      const profile: PatientResource = await medplum.readResource(ResourceType.Patient, id);
        setFirstName(profile?.name[0]?.given[0]);
        setLastName(profile?.name[0]?.family);
        setCity(profile?.address?.[0]?.city);
        setDate(profile?.birthDate);
    } catch(error) {
      trackLog<Error>("error in read resource", error);
    }
  };

  const onSignOut = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      await GoogleSignin.signOut();
    }
    storage.set(LOGIN_CODE, "");
    storage.set(LOGIN_VALUE, "");
    medplum.signOut().catch(console.error);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.profileContaner}>
          <Avatar.Text
            size={100}
            label={firstName[0]?.toUpperCase()+lastName[0]?.toUpperCase()}
            style={styles.avatarStyle}
            labelStyle={styles.labelStyle}
          />
          <View style={styles.userInfoContainer}>
            <Text style={styles.name}>{firstName} {lastName}</Text>
            <Subtitle title={city} titleStyle={styles.city}/>
            <Subtitle title={date} />
          </View>
        </View>
        <ProfileRowItem
          icon="person-add-outline"
          title={i18n.t("profile.editProfile")}
          onPress={goToEditProfile}
        />
        <ProfileRowItem
          icon="settings-outline"
          title={i18n.t("profile.settings")}
          onPress={goToSettings}
        />
        <ProfileRowItem
          icon="exit-outline"
          title={i18n.t("profile.logOut")}
          onPress={onSignOut}
        />
      </ScrollView>
      <StatusBar style="auto" backgroundColor={COLORS.white} />
    </View>
  );
};

export default Profile;
