
const App = new Vue({
    el: '#appVue',
    data: () => ({
        abholung: false
    }),
    methods: {
        onChangeSwitchAbholung() {
            this.abholung = this.abholung==true ? false : true;
            console.log(this.abholung)
        }
    }
})