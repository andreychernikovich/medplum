const appName = "medplum_rn";
const configs = {
  medplum_rn: {
    version: "1.0",
    name: "medplum_rn",
    splash: {
        image: "assets/splash.png",
      },
    android: {
      versionCode: 1,
      package: "com.medplum.softteco",
    },
    icon: "assets/icon.png",
    ios: {
      bundleIdentifier: "com.medplum.softteco",
    },
    extra : {
        buildType : "medplum_rn"
    }
  },
  whitelabelOne: {
    name: "WhitelabelOne",
    icon: "assets/whitelabelone/icon.png",
    splash: {
        image: "assets/whitelabelone/splash.png",
      },
    android: {
      versionCode: 1,
      package: "com.medplum.softteco.whitelabelone",
    },
    ios: {
      bundleIdentifier: "com.medplum.softteco.whitelabelone",
    },
    version: "1.0",
    extra : {
        buildType : "whitelabelone"
    }
  },
};
export default ({ config }) => {
  return {
    ...configs[appName],
  };
};