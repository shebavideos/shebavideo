"strict mode"

import App from "./components/App";

document.body.style.backgroundColor = '#222';
document.body.style.color = 'white';
document.body.style.margin = '0px';
document.body.style.padding = '15px';
document.body.style.boxSizing = 'border-box';
document.body.style.textDecoration = 'none';

/**
 * @description Since we are using HtmlWebpackPlugin WITHOUT a template,
 we should create our own root node in the body element before rendering into it
 */
const root = document.createElement('div');

root.id = "root";

App(root);

document.body.appendChild(root);


