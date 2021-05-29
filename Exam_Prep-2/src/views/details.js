import {html} from '../../../Exam-RePrep-2/node_modules/lit-html/lit-html.js'
import { deleteRecord, getCarById } from '../api/data.js';

const detailsTemplate = (car, isOwner, onDelete) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src="${car.imageUrl}">
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}</li>
        </ul>
        <p class="description-para">${car.description}</p>
        <div class="listings-buttons">
            ${isOwner ? html`
            <a href="/edit/${car._id}" class="button-list">Edit</a>
            <a @click=${onDelete} class="button-list">Delete</a>` : ''}  
        </div>
    </div>
</section>`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const car = await getCarById(id);
    const userId = sessionStorage.getItem('userId');

    ctx.render(detailsTemplate(car, car._ownerId == userId, onDelete));

    async function onDelete() {
        const confirmed = confirm('Are you sure you want to delete this car?');
        if (confirmed) {
            await (deleteRecord(car._id));
            ctx.page.redirect('/catalog');
        }
    }
}