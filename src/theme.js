import style from './styles/main-theme.scss';

// TODO get somewhere the theme that is selected, and load accordingly

let mainThemeStyle = document.createElement('style');
mainThemeStyle.innerHTML = style;

export default mainThemeStyle;