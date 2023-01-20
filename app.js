// new Vue({
//     el: '#appVue',
//     data:{},
//     methods:{}
// })

let plzOrt;
let standortSpendezentrum = '50667'

document.getElementById('switchAbholung').checked = false

document.getElementById('switchAbholung').addEventListener('change', () => {
    document.getElementById('adressEingabeForm').classList.toggle('d-none')
})

// read local JSON file in javascript
fetch("./assets/plzOrt.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        plzOrt = data;

    })


document.getElementById('inputPlz').addEventListener('change', (event) => {
    let eingabePlz = event.target.value

    if (standortSpendezentrum.substring(0, 2) === eingabePlz.substring(0, 2)) {
        if (plzOrt[eingabePlz]) {
            document.getElementById('inputStadt').value = plzOrt[eingabePlz]['ort']
        } else {
            document.getElementById('inputStadt').value = 'Dies ist keine gültige PLZ'
        }
    } else {
        document.getElementById('inputStadt').value = ''
        document.getElementById('inputPlz').value = ''
    }
})