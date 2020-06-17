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
    unit: 0,
    energyCharge: 0,
    split:[],
    months:1,
    headers: [
      {
        text: 'Unit',
        value: 'unit',
      },
      { text: 'Cost for unit', value: 'unitCost' },
      { text: 'Cost', value: 'cost' },
      
    ],
  }),
  watch: {
    unit() {
      this.calculate();
    },
    months() {
      this.calculate();
    },
  },
  computed: {
    size() {
      if (this.energyCharge / 5 <= 60) return 60;
      if (this.energyCharge / 5 >= 300) return 300;
      return this.energyCharge / 5;
    },
    color() {
      switch (true) {
        case this.unit <= 40:
          return "green";
        case this.unit > 500:
          return "red";
        case this.unit > 350:
          return "orange darken-5";
        case this.unit > 300:
          return "orange darken-4";
        case this.unit > 200:
          return "orange darken-3";
        case this.unit > 80:
          return "orange darken-2";
        case this.unit > 40:
          return "orange darken-1";
      }
    },
  },
  mounted() {
    const vm = this;
    vm.labels = [...Array(601).keys()];
    vm.labels.forEach(function (item, index) {
      vm.labels[index] = item % 100 === 0 ? item : " ";
      vm.value.push(vm.getBillAmount(item));
    });
    this.split =[];
  },
  methods: {
    calculate() {
      this.split = []
      this.energyCharge = this.months * (this.getBillAmount(this.unit/this.months));
      this.$forceUpdate();
    },
    getVeriyingSlabBill(unit) {
      //incrementing charge
      if (unit > 200) {
        this.split.push({ unit: unit - 200,unitCost: 7.6, cost: (unit - 200) * 7.6});    
        return (unit - 200) * 7.6 + this.getVeriyingSlabBill(200);
      }
      if (unit > 150) {
        this.split.push({ unit: unit - 150,unitCost: 6.4 , cost: (unit - 150) * 6.4});  
        return (unit - 150) * 6.4 + this.getVeriyingSlabBill(150);
      }
      if (unit > 100) {
        this.split.push({ unit: unit - 100,unitCost: 4.8, cost: (unit - 100) * 4.8});  
        return (unit - 100) * 4.8 + this.getVeriyingSlabBill(100);
      }
      if (unit > 50) {
        this.split.push({ unit: unit - 50,unitCost: 3.7 , cost: (unit - 50) * 3.7});  
        return (unit -50) * 3.7 + this.getVeriyingSlabBill(50);
      }
      this.split.push({ unit: unit,unitCost: 3.15, cost: (unit) * 3.15});  
      return unit * 3.15;
    },
    getBillAmount(unit) {
      //fixed charge

      if (unit > 500) {
        this.split.push({ unit: unit,unitCost: 7.9, cost:unit * 7.9});  
        return unit * 7.9;
      }
      if (unit > 400) {
        this.split.push({ unit: unit,unitCost: 7.1 , cost:unit * 7.1});  
        return unit * 7.1;
      }
      if (unit > 350) {
        this.split.push({ unit: unit,unitCost: 6.9, cost:unit * 6.9});  
        return unit * 6.9;
      }
      if (unit > 300) {
        this.split.push({ unit: unit,unitCost: 6.6, cost:unit * 6.6});  
        return unit * 6.6;
      }
      if (unit > 250) {
        this.split.push({ unit: unit,unitCost: 5.8, cost:unit * 5.8});  
        return unit * 5.8;
      }
      return this.getVeriyingSlabBill(unit);
    },
  },
});
