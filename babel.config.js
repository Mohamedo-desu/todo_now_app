module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { unstable_transformImportMeta: true }]],
    plugins: [['react-native-unistyles/plugin']],
    env: {
      production: {
        plugins: ["transform-remove-console"],
      },
    },
  };
};
