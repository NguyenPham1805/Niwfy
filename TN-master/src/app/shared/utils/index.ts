export const changeTheme = (theme: boolean) => {
  if (theme) {
    document.documentElement.style.setProperty('--color', '#e0e5f5');
    document.documentElement.style.setProperty('--background', '#303030');
  } else {
    document.documentElement.style.setProperty('--color', '#3f4146');
    document.documentElement.style.setProperty('--background', '#e9e6e4');
  }
};
