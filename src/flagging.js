const flags = {
  'new-input': false,
};

export const isEnabled = (featureFlag) => {
  if (!featureFlag) return true;
  return featureFlag.split(',').some((f) => {
    console.log(f, flags[f.replace('!', '')], f.startsWith('!'));
    return flags[f.replace('!', '')] || f.startsWith('!');
  });
};
