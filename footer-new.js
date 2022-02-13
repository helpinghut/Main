let footerNewhead = document.getElementsByTagName('head')[0];

// jQuery
// let script = document.createElement('script');
// script.type = 'text/javascript';
// script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
// head.appendChild(script);

// Fontawesome CSS for Icons
faCss = document.createElement('link');
faCss.rel = 'stylesheet';
faCss.href = 'https://use.fontawesome.com/releases/v5.0.13/css/all.css';
faCss.type = 'text/css';

// check if fontawesome is already present in head
let faCssExists = false;
for (let i = 0; i < footerNewhead.children.length; i++) {
    if (footerNewhead.children[i].href === faCss.href) {
        faCssExists = true;
        break;
    }
}
if (!faCssExists) {
    footerNewhead.appendChild(faCss);
}

// Bootstrap CSS
// bootstrapCss = document.createElement('link');
// bootstrapCss.rel = 'stylesheet';
// bootstrapCss.href = 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css';
// head.appendChild(bootstrapCss);

// // Bootstrap JS
// bootstrapJs = document.createElement('script');
// bootstrapJs.src = 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js';
// head.appendChild(bootstrapJs);

// Custom CSS
customCss = document.createElement('link');
customCss.rel = 'stylesheet';
customCss.href = 'footer-new.css';
customCss.type = 'text/css';
footerNewhead.appendChild(customCss);

// get the footer page as html
fetch('./footer-new.html').then(function (response) {
    return response.text();
}).then(function (html) {
    // convert html to dom
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, 'text/html');
    // get the footer html from dom
    html = doc.getElementsByTagName('body')[0].innerHTML;
    // insert the footer html
    let footer = document.getElementsByTagName('footer')[0];
    footer.innerHTML = html;
});