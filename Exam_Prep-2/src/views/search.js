import { html } from '../../../Exam-RePrep-2/node_modules/lit-html/lit-html.js';
import { getCarByYear } from '../api/data.js';
import { carTemplate } from './common/carTemplate.js';

const searchTemplate = (onClick) => html`
<section id="search-cars">
            <h1>Filter by year</h1>

            <div class="container">
                <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
                <button class="button-list" @click="${onClick}">Search</button>
            </div>
</section>
`
const resultTemplate = (onClick, cars) => html`
<section id="search-cars">
    <h1>Filter by year</h1>
    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button class="button-list" @click="${onClick}">Search</button>
    </div>
    <h2>Results:</h2>
    <div class="listings">
        ${cars.length == 0 ? html`<p class="no-cars"> No results.</p>` : cars.map(carTemplate)}
    </div>
</section>
`
export async function searchPage(ctx){
    ctx.render(searchTemplate(onClick));

    async function onClick(event){
        event.preventDefault();
        const yearToSearch = document.querySelector('input').value;
        const cars = await getCarByYear(yearToSearch);
        ctx.render(resultTemplate(onClick,cars));
    }
}