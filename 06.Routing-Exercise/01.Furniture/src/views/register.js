import { html } from '../../../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';

const registerTemplate = (onSubmit, errorMessage, invalidEmail, invalidPassword, invalidRePass) => html `
<div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @sumbit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    ${errorMessage ? html`<div class="form-group">
                    <p>${errorMessage}</p>
</div>` : ''}
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class=${'form-control' + (invalidEmail ? ' is-invalid' : '')} id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class=${'form-control' + (invalidPassword ? ' is-invalid' : '')} id="password" type="password" name="password">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class=${'form-control' + (invalidRePass ? ' is-invalid' : '')} id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>
`
export function registerPage(ctx){
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repeat = formData.get('rePass').trim();

        if(email == '' || password == '' || repeat == '') {
           return ctx.render(registerTemplate(onSubmit, 'All fields are required!', email == '', password == '', repass == ''));
        }
        if(password != repeat) {
            return ctx.render(registerTemplate(onSubmit, 'Passwords dont\'t match!', false, true, true));
        }

        await register(email, password);
        
        ctx.setUserNav();
        ctx.page.redirect('/');
    }
}