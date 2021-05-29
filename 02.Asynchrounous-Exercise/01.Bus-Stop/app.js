function getInfo() {
    const stopId = document.getElementById('stopId');
    const ul = document.getElementById('buses');
    let stopName = document.getElementById('stopName');

    fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopIdElement.value}`)
    .then(res => res.json()).then(data => {
        stopId.value = '';
        ul.innerHTML = '';

        stopName.textContent = data.name;
        let buses = Object.keys(data.buses);
        let li = buses.map(x => `<li>Bus ${x} arrives in ${data.buses[x]}</li>`).join(' ');
        ul.innerHTML = li;
    })
    .catch(error => {
        ul.innerHTML = '';
        stopName.textContent = 'Error';
    })
}