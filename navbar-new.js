// get the nav elements from the document
let current_nav = document.getElementsByTagName('nav')[0];

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