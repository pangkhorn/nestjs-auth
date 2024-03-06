export const getDefaultProfile = (user: { gender?: string; fullName: string }) => {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.fullName)}&backgroundType=solid,gradientLinear`;
};
