
const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];

new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data: () => ({
    width: 1,
    radius: 10,
    padding: 8,
    lineCap: "round",
    gradient: gradients[5],
    value: [],
    labels: [],
    gradientDirection: "top",
    gradients,
    fill: false,
    type: "trend",
    autoLineWidth: false,
  }),
  mounted() {
    const vm = this;
    vm.labels = [...Array(601).keys()];
    vm.labels.forEach(function (item, index) {
      vm.labels[index]=item%100===0 ? item : ' ';
      vm.value.push(vm.getBillAmount(item));
    });
    
  },
  methods: {
    getVeriyingSlabBill(unit){

     //incrementing charge
      if(unit> 200)
       {
         return (unit-200)*6.5 + this.getVeriyingSlabBill(200)
       }
       if(unit> 150)
       {
         return (unit-150)*5.30 + this.getVeriyingSlabBill(150)
       }
       if(unit> 120)
       {
         return (unit-120)*3.80 + this.getVeriyingSlabBill(120)
       }
       if(unit> 80)
       {
         return (unit-80)*3 + this.getVeriyingSlabBill(80)
       }
       return unit * 2.2

    },
    getBillAmount(unit) {
      //fixed charge

      if(unit> 500)
       {
         return unit*7;
       }
       if(unit> 400)
       {
         return unit*6;
       }
       if(unit> 350)
       {
         return unit*5.5;
       }
       if(unit> 300)
       {
         return unit*5;
       }
       if(unit<=40)
       {
         return unit * 1.5
       }
     return this.getVeriyingSlabBill(unit);
    },
  },
});
