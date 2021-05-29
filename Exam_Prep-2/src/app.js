import page from '../../Exam-RePrep-2/node_modules/lit-html.js';
import { render } from '../../Exam-RePrep-2/node_modules/lit-html/lit-html.js';

import { logout } from './api/data.js';

import { homePage } from './views/home.js';
import { editPage } from './views/edit.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { myListingsPage } from './views/myListings.js';
import { catalogPage } from './views/catalog.js';
import { searchPage } from './views/search.js';

const main = document.getElementById('site-content');

page('/', decorateContext, homePage);
page('/catalog', decorateContext, catalogPage);
page('/search', decorateContext, searchPage);
page('/myListings', decorateContext, myListingsPage);
page('/details/:id', decorateContext, detailsPage);
page('/create', decorateContext, createPage);
page('/edit/:id', decorateContext, editPage);
page('/register', decorateContext, registerPage);
page('/login', decorateContext, loginPage);

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    setUserNav();
    page.redirect('/');
});

setUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const username = sessionStorage.getItem('username');
    if(username != null) {
        document.getElementById('userName').textContent = `Welcome ${username}`;
        document.getElementById('profile').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}