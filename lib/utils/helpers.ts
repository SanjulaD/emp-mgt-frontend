export const getGenderDisplay = (gender: string) => {
  return gender === 'M' ? 'Male' : gender === 'F' ? 'Female' : 'Other';
};
