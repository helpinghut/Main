// get the nav elements from the document
let current_nav = document.getElementsByTagName('nav')[0];

// remove navbar.css from head if present
// iterate thorugh links in head
let navbarNewhead = document.getElementsByTagName('head')[0];
let navbarNewCssExists = false;
for (let i = 0; i < navbarNewhead.children.length; i++) {
    // check if navbar.css is present 
    if (navbarNewhead.children[i].href === 'navbar.css') {
        navbarNewhead.removeChild(navbarNewhead.children[i]);
    }
    // check if navbar-new.css is present
    if (navbarNewhead.children[i].href === 'navbar-new.css') {
        navbarNewCssExists = true;
    }
}

// append navbar-new.css to head if not present
if (!navbarNewCssExists) {
    let navbarNewCss = document.createElement('link');
    navbarNewCss.rel = 'stylesheet';
    navbarNewCss.href = 'navbar-new.css';
    navbarNewCss.type = 'text/css';
    navbarNewhead.appendChild(navbarNewCss);
}

// Fontawesome CSS for Icons
faCss = document.createElement('link');
faCss.rel = 'stylesheet';
faCss.href = 'https://use.fontawesome.com/releases/v5.0.13/css/all.css';
faCss.type = 'text/css';

// check if fontawesome is already present in head
let navfaCssExists = false;
for (let i = 0; i < navbarNewhead.children.length; i++) {
    if (navbarNewhead.children[i].href === faCss.href) {
        navfaCssExists = true;
        break;
    }
}
if (!navfaCssExists) {
    navbarNewhead.appendChild(faCss);
}

// get navbar-new.html as html
fetch('./navbar-new.html').then(function (response) {
    return response.text();
}).then(function (html) {
    // convert html to dom
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, 'text/html');
    // get the nav html from dom
    html = doc.getElementsByTagName('nav')[0].innerHTML;
    // insert the nav html
    current_nav.innerHTML = html;

    let toggleScript = doc.getElementById('navbar-new-toggle-script');
    let scriptToinsert = document.createElement('script');
    scriptToinsert.type = 'text/javascript';
    scriptToinsert.innerHTML = toggleScript.innerHTML;
    //append the script in the body
    document.body.appendChild(scriptToinsert);
});