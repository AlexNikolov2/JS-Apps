import {towns} from './towns.js';
import {html, render} from '../../node_modules/lit-html/lit-html.js';

const searchTemplate = (town,match) => html `
<article>
        <div id="towns">
            <ul>
            ${towns.map(t=>itemTemplate(t,match))}
            </ul>
        </div>
        <input type="text" id="searchText" />
        <button @click=${search}>Search</button>
        <div id="result">${countMatches(town.match)}</div>
    </article>
`

   const itemTemplate=(name,match)=>html`
<li class=${(match && name.toLowerCase().includes(match.toLowerCase())) ? 'active' :  ''}>${name}</li>
`;

const main=document.body;
update();

function update(match='')
{
   const result=searchTemplate(towns,match)
   render(result,main);
}
function search(event) {
   const match=event.target.parentNode.querySelector('input').value;
   update(match);
}

function countMatches(towns,match)
{
   const matches= towns.filter(t=>match && t.toLowerCase().includes(match.toLowerCase())).length;
      if(matches)
      {
         return `${matches} matches found`;
      }
      else
      {
         return '';
      }
}

