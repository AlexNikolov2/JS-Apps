import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemById, editRecord } from '../api/data.js';

const editTemplate = (data, onSubmit) => html`
<section id="edit-meme">
            <form id="edit-form" @submit=${onSubmit}>
                <h1>Edit Meme</h1>
                <div class="container">
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title" value='${data.title}'>
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description">
                            ${data.description}
                        </textarea>
                    <label for="imageUrl">Image Url</label>
                    <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" value='${data.imageUrl}'>
                    <input type="submit" class="registerbtn button" value="Edit Meme">
                </div>
            </form>
        </section>
`

export async function editPage(ctx) {
    const id = ctx.params.id;
    const data = await getItemById(id);

    ctx.render(editTemplate(data,onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');

        if (!title || !description || !imageUrl) {
            return alert('Please fill all fields!');
        }

        await editRecord(data._id, {
            title,
            description,
            imageUrl
        });

        ctx.page.redirect(`/details/${data._id}`);
    }
};