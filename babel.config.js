module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        'babel-preset-expo',
        {
          unstable_transformImportMeta: true,
          'react-compiler': {
            compilationMode: 'strict',
            panicThreshold: 'all_errors',
            sources: filename => {
              // Match file names to include in the React Compiler.
              return filename.includes('src/');
            },
          },
        },
      ],
    ],
    plugins: [['react-native-unistyles/plugin']]
  };
};
