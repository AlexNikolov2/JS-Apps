function solve() {
    const info = document.getElementById('info');
    const departButton = document.getElementById('depart');
    const arriveButton = document.getElementById('arrive');
    let next = 'depot';
    let url = `http://localhost:3030/jsonstore/bus/schedule/`

    function depart() {
        fetch(`${url}${next}`).then(res => res.json())
        .then(data => {
            info.textContent = `Next stop ${data.name}`
            departButton.disabled = true;
            arriveButton.disabled = false;
        })
    }

    function arrive() {
        fetch(`${url}${next}`).then(res => res.json())
        .then(data => {
            info.textContent = `Arriving at ${data.name}`;
            departButton.disabled = false;
            arriveButton.disabled = true;
            next = data.next;
        })
    }

    return {
        depart,
        arrive
    };
}

let result = solve();