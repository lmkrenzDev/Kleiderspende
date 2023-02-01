'use strict'

let plzOrt;
let standortSpendezentrum = '50667'

// Einlesen der JSON-Datei mit allen PLZ und zugehörigen Orten und zwischenspeichern der JSON-Daten in der Variablen plzOrt
fetch("./assets/plzOrt.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        plzOrt = data;

    })

// Initialisierung von Vue.js
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
    // Functions für die Stuerung der WEbanwenungsoberfläche
    methods: {
        //Function für das Umschalten und entsprechende Ein- und Ausblenden der Eingabefelder im Formular 
        onChangeSwitchAbholung() {
            this.abholung = this.abholung == true ? false : true;
            this.eingabeAbholung = this.abholung == true ? 'Abholung' : 'Übergabe an der Geschäftsstelle';
        },
        // Function für die Validierung der Eingaben 
        // Es wird jeweils überprüft, ob die Eingaben vorhanden sind 
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
                // Bei der PLZ wird zusätzlich geprüft, ob die ersten beiden Ziffern den ersten beiden Ziffern des Spendenzentrums entsprechen
            } else if (standortSpendezentrum.substring(0, 2) === this.plz.substring(0, 2)) {
                this.validEingabePlz = true;
                this.invalidEingabePlz = false;
                // Zusätzlich wird bei der PLZ geprüft, ob diese in Deutschland vorhanden ist bzw. ob ein Ort zu dieser PLZ gehört
            } else if (this.ort == '') {
                this.fehlermeldungPlz = 'Bitte geben Sie eine gültige deutsche PLZ ein.'
                this.invalidEingabePlz = true;
                this.validEingabePlz = false;
            } else {
                this.fehlermeldungPlz = 'Die Kleiderspende kann von dieser Adresse nicht abgeholt werden, da Sie nicht in unserem Geschäftsbereich liegt!'
                this.invalidEingabePlz = true;
                this.validEingabePlz = false;
            }

            // Überprüfen, ob alle Eingaben richitig sind, wenn Ja wird die Zusammenfassung angezeigt
            if (this.validEingabeArtKleiderspende && this.validEingabeKrisengebiet) {
                this.wasValidated = true;
            }
            /// Bei einer Abholdung an einer Abholadresse ist eine zusätzliche Überpfürung weiterer Eingabefelder notwendig
            if (this.abholung) {
                if (this.validEingabeVorname && this.validEingabeNachname && this.validEingabeStrasse && this.validEingabeHausnummer && this.validEingabePlz) {
                    this.wasValidated = true;
                } else {
                    this.wasValidated = false;
                }
            }

            //Zwischenspeichern der Registrierungszeit um diese in der Zusammenfassung anzuzeigen
            let dateNow = new Date()
            this.uhrzeit = dateNow.toLocaleTimeString('de-de');
            this.datum = dateNow.toLocaleDateString();
        },
        //Function für das automatische Ausfüllen des Orts bei der Eingabe einer korrekten PLZ
        changePlz() {

            this.ort = plzOrt[this.plz] ? plzOrt[this.plz]['ort'] : '';
        }
    }
}).mount('#appVue')
