  import { html } from '../../../Exam-RePrep-2/node_modules/lit-html/lit-html.js';
import { getCars } from '../api/data.js';
import { carTemplate} from './carTemplate.js';

const catalogTemplate = (data) => html`
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">
        ${data.length == 0 ? html`<p class="no-cars">No cars in database.</p>` : data.map(carTemplate)}
    </div>
</section>`;

export async function catalogPage(ctx) {
    const data = await getCars();

    ctx.render(catalogTemplate(data));
}
