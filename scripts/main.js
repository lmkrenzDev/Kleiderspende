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
            vorname: '',
            nachname: '',
            strasse: '',
            hausnummer: '',
            plz: '',
            ort: '',
            eingabeAbholung: 'Übergabe an der Geschäftsstelle',
            validEingabeArtKleiderspende: '',
            invalidEingabeArtKleiderspende: '',
            validEingabeKrisengebiet: '',
            invalidEingabeKrisengebiet: '',
            validEingabeVorname: '',
            invalidEingabeVorname: '',
            validEingabeNachname: '',
            invalidEingabeNachname: '',
            validEingabeStrasse: '',
            invalidEingabeStrasse: '',
            validEingabeHausnummer: '',
            invalidEingabeHausnummer: '',
            validEingabePlz: '',
            invalidEingabePlz: '',
            fehlermeldungPlz: '',
            datum: '',
            uhrzeit: ''


        }
    },
    methods: {
        onChangeSwitchAbholung() {
            this.abholung = this.abholung == true ? false : true;
            this.eingabeAbholung = this.abholung == true ? 'Abholung' : 'Übergabe an der Geschäftsstelle';
        },
        validation() {

            this.validEingabeArtKleiderspende = this.artKleiderspende != '' ? true : false;
            this.invalidEingabeArtKleiderspende = this.artKleiderspende == '' ? true : false;

            this.validEingabeKrisengebiet = this.krisengebiet != 'x' ? true : false;
            this.invalidEingabeKrisengebiet = this.krisengebiet == 'x' ? true : false;

            this.validEingabeVorname = this.vorname != '' ? true : false;
            this.invalidEingabeVorname = this.vorname == '' ? true : false;

            this.validEingabeNachname = this.nachname != '' ? true : false;
            this.invalidEingabeNachname = this.nachname == '' ? true : false;

            this.validEingabeStrasse = this.strasse != '' ? true : false;
            this.invalidEingabeStrasse = this.strasse == '' ? true : false;

            this.validEingabeHausnummer = this.hausnummer != '' ? true : false;
            this.invalidEingabeHausnummer = this.hausnummer == '' ? true : false;

            if (this.plz == '') {
                this.fehlermeldungPlz = 'Bitte geben Sie eine gültige deutsche PLZ ein.'
                this.invalidEingabePlz = true;
                this.validEingabePlz = false;

            } else if (standortSpendezentrum.substring(0, 2) === this.plz.substring(0, 2)) {
                this.validEingabePlz = true;
                this.invalidEingabePlz = false;

            } else if (this.ort == '') {
                this.fehlermeldungPlz = 'Bitte geben Sie eine gültige deutsche PLZ ein.'
                this.invalidEingabePlz = true;
                this.validEingabePlz = false;
            } else {
                this.fehlermeldungPlz = 'Die Kleiderspende kann von dieser Adresse nicht abgeholt werden, da Sie nicht in unserem Geschäftsbereich liegt!'
                this.invalidEingabePlz = true;
                this.validEingabePlz = false;
            }

            if (this.validEingabeArtKleiderspende && this.validEingabeKrisengebiet) {
                this.wasValidated = true;
            }
            if (this.abholung) {
                if (this.validEingabeVorname && this.validEingabeNachname && this.validEingabeStrasse && this.validEingabeHausnummer && this.validEingabePlz) {
                    this.wasValidated = true;
                } else {
                    this.wasValidated = false;
                }
            }

            let dateNow = new Date()
            this.uhrzeit = dateNow.toLocaleTimeString('de-de');
            this.datum = dateNow.toLocaleDateString();
        },
        changePlz() {

            this.ort = plzOrt[this.plz] ? plzOrt[this.plz]['ort'] : '';
        }
    }
}).mount('#appVue')
