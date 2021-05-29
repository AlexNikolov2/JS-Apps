function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', getPhoneBook);
    document.getElementById('btnCreate').addEventListener('click', createContact);

    getPhoneBook();
}

attachEvents();

async function createContact(){
    const person = document.getElementById('person').value;
    const phone = document.getElementById('phone').value;

    await addContact({'person': person, 'phone': phone});

    
    document.getElementById('person').value = '';
    document.getElementById('phone').value = '';
}

async function getPhoneBook() {

    const response = await fetch('http://localhost:3030/jsonstore/phonebook');
    const data = await response.json();

    document.getElementById('phonebook').innerHTML = '';
    Object.values(data).map(appendPhoneBook);

}

async function addContact(person) {

    await fetch('http://localhost:3030/jsonstore/phonebook', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person)
    });
}

async function deleteContact(id) {
    await fetch('http://localhost:3030/jsonstore/phonebook/' + id, {
        method: 'delete'
    });
}

function appendPhoneBook(person){
    const phonebook = document.getElementById('phonebook');
    const li = document.getElementById('li');
    li.id = 'phonebook';
    li.textContent = `${person.person}:${person.phone}`;
    const button = document.createElement('button');
    button.id = person._id;
    button.textContent = 'Delete';
    li.appendChild(button);

    button.addEventListener('click', (e) => {
        deleteContact(e.target.id);
        e.target.parentElement.remove();
    });
    phonebook.appendChild(li);
}