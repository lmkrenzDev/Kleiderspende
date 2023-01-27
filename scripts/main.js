'use strict'

let plzOrt;
let standortSpendezentrum = '50667'

// read local JSON file in javascript
fetch("./assets/plzOrt.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        plzOrt = data;

    })

const {
    createApp
} = Vue

createApp({
    data() {
        return {
            abholung: false, 
            wasValidated: false,
            artKleiderspende: '',
            krisengebiet: 'x',
            vorname:'',
            nachname:'',
            strasse:'',
            hausnummer:'',
            plz:'',
            ort:'',
            eingabeAbholung:'Übergabe an der Geschäftsstelle',

        }
    },
    methods: {
        onChangeSwitchAbholung() {
            this.abholung = this.abholung == true ? false : true;
            this.eingabeAbholung = this.abholung == true ? 'Abholung' : 'Übergabe an der Geschäftsstelle';
        },
        validation(){

            

            this.wasValidated = true;
        },
        changePlz(){
            // let eingabePlz = event.target.value

            if (standortSpendezentrum.substring(0, 2) === this.plz.substring(0, 2)) {

                this.ort = plzOrt[this.plz] ? plzOrt[this.plz]['ort'] : 'Dies ist keine gültige PLZ';
                // if (plzOrt[this.plz]) {
                //     this.ort = plzOrt[this.plz]['ort']
                // } else {
                //     document.getElementById('inputStadt').value = 'Dies ist keine gültige PLZ'
                // }
            } else {
                this.ort = ''
                this.plz = ''
            }
        }
    }
}).mount('#appVue')



