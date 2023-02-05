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

//Hearder und Footer-Komponeten aufbauen
Vue.component('header-kk', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark pt-lg-3 sticky-top">
            <div class="container">
                <!-- Logo -->
                <a class="navbar-brand fw-bold fs-2" href="/index.html">
                    <img src="/assets/Logo.png" alt="Logo" width="40" height="40"
                        class="d-inline-block align-text-top me-2">
                    Kreiselkleider
                </a>
                <!-- Burger-Menü für kleine Endgeräte (wird auf großen Endgeräten nicht angezeigt)  -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <!-- Liste mit den einzelnen Menüpunkten -->
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 fs-4">
                        <li class="nav-item mx-lg-2">
                            <a class="nav-link text-white" href="/index.html">Spende</a>
                        </li>
                        <li class="nav-item mx-lg-2">
                            <a class="nav-link text-white" href="Spendenregionen.html">Spendenregionen</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
`
});

Vue.component('footer-kk', {
    template: `
        <nav class="navbar fixed-bottom navbar-dark bg-dark">
            <div class="container">
                <a class="navbar-brand fs-5" href="/index.html">&copy 2023 Kreiselkleider</a>
                <a class="navbar-brand fs-5" href="impressum.html">Impressum</a>
            </div>
        </nav>
        `
});

// Initialisierung von Vue.js
let vueApp = new Vue({
    el: '#appVue',
    //Variablen, die in der Index.html dynamisch verwendet werden
    data: {
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
})