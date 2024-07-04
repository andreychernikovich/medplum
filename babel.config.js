module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
        "@babel/plugin-proposal-export-namespace-from",
        "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@utils": "./src/utils",
            "@constants": "./src/constants",
            "@i18n": "./src/i18n",
            "@navigation": "./src/navigation",
            "@src/types": "./src/types",
            "@hooks": "./src/hooks",
            "@actions": "./src/actions",
            "@assets": "./src/assets",
            "@services": "./src/services",
            "@containers": "./src/containers"
          },
        },
      ],
    ],
  };
};
