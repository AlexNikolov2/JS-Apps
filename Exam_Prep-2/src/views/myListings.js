import { html } from '../../../Exam-RePrep-2/node_modules/lit-html/lit-html.js';
import { getMyCars } from '../api/data.js';
import { carTemplate} from './carTemplate.js';

const myListingsTemplate = (cars) => html`
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">
        ${cars.length == 0 ? html`<p class="no-cars"> You haven't listed any cars yet.</p>` : cars.map(carTemplate)}
    </div>
</section>`;

export async function myListingsPage(ctx) {
    const id = sessionStorage.getItem('userId');

    const cars = await getMyCars(id);

    ctx.render(myListingsTemplate(cars));
};