import {html, render} from '../../node_modules/lit-html/lit-html.js';

const listTemplate = (data) => html`
<ul>
    ${data.map(t => html`<li>${t}</li>`)}
</ul>`;

document.getElementById('btnLoadTowns').addEventListener('click', (event) => {
    event.preventDefault();
    const input = document.getElementById('towns').nodeValue;
    const towns = input.split(', ').map(x =>x.trim());

    const result = listTemplate(towns);
    const root = document.getElementById('root');
    render(result,root);
})
