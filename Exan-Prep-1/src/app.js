import page from '../../Meme_Lounge/node_modules/page/page.mjs';
import { render } from '../../Meme_Lounge/node_modules/lit-html/lit-html.js';
import { logout } from './api/data.js';

import { welcomePage } from './views/home.js';
import { editPage } from './views/edit.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { profilePage } from './views/profile.js';
import { allMemesPage } from './views/allMemes.js';

const main = document.querySelector('main');

page('/', decorateContext, welcomePage);
page('/allMemes', decorateContext, allMemesPage);
page('/my-profile', decorateContext, profilePage);
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
    const email = sessionStorage.getItem('email');
    if(email != null) {
        document.querySelector('div.profile > span').textContent = `Welcome, ${email}`;
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}