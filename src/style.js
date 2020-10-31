import indexScss from './styles/index.scss';
import blogScss from './styles/blog.scss';
import cvScss from './styles/cv.scss';
import mainTitleScss from './styles/main-title.scss';
import mainThemeScss from './styles/main-theme.scss';
import popTextScss from './styles/pop-text.scss';

export const indexStyle = document.createElement('style');
indexStyle.appendChild(document.createTextNode(indexScss));

export const blogStyle = document.createElement('style');
blogStyle.appendChild(document.createTextNode(blogScss));

export const mainTitleStyle = document.createElement('style');
mainTitleStyle.appendChild(document.createTextNode(mainTitleScss));

export const cvStyle = document.createElement('style');
cvStyle.appendChild(document.createTextNode(cvScss));

export const mainThemeStyle = document.createElement('style');
mainThemeStyle.appendChild(document.createTextNode(mainThemeScss));

export const popTextStyle = document.createElement('style');
popTextStyle.appendChild(document.createTextNode(popTextScss));