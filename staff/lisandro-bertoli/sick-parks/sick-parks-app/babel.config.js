module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver',
        {
          alias: {
            'sick-parks-utils': '../sick-parks-utils',
            'sick-parks-errors': '../sick-parks-errors',
            'sick-parks-data': '../sick-parks-data',
          },
        },
      ],
    ]
  };
};
