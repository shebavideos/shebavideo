"strict mode"

import App from "./components/App";
// styling main css
document.body.style.backgroundColor = '#222';
document.body.style.color = 'white';
document.body.style.margin = '0px';
document.body.style.padding = '0px';
document.body.style.boxSizing = 'border-box';
document.body.style.textDecoration = 'none';

// Since we are using HtmlWebpackPlugin WITHOUT a template,
//  we should create our own root node in the body element before rendering into it
const root = document.createElement('div');

root.id = "root";

App(root);

document.body.appendChild(root);


