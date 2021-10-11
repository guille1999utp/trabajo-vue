<template>
  <div class="hello">
  <div class="row justify-content-md-center col-md-12 hola">
  
    <div class="col-md-4">
      <h3 >Generos covid 19</h3>
  <br>
  <br>
    <pie-chart :data="chartDatagenero" :options="chartOptions"></pie-chart>
    <h3>{{ casosgenero.hombre}} hombres</h3>
    <h3>{{ casosgenero.mujer}} mujeres</h3>
  </div>
    <div class="col-md-4">
      <h3 >Covid 19 por edad</h3>
  <br>
  <br>
    <pie-chart :data="chartDataedad" :options="chartOptions"></pie-chart>
    <h3>{{ casosedades.m020}} de 0 a 20 años</h3>
    <h3>{{ casosedades.m2040}} de 20 a 40 años</h3>
    <h3>{{ casosedades.m40plus}} de 40 años en adelante</h3>
  </div>
  
    </div>
  <div class="row justify-content-md-center tabla ">
      <h3 >Ciudades con mas Casos covid 19</h3>
  <br>
  <br>
    <div class="col-md-6">
     <Basic :dato="tabla"></Basic>
    </div>
  </div>
  
  </div>
</template>

<script>
import PieChart from "./PieChart.js";
import Basic from "./components/Line.vue";
import axios from 'axios'
import _ from 'lodash'
export default {
  name: 'App',
   components: {
    PieChart,
    Basic
  },
 async mounted(){
     await axios.get('https://www.datos.gov.co/resource/gt2j-8ykr.json').then((res)=>{ 
        this.users = res.data;
     let h =  this.users.filter(hombre => hombre.sexo === 'M');
     this.casosgenero.hombre = h.length;
     let m = this.users.filter(mujer => mujer.sexo === 'F');
     this.casosgenero.mujer = m.length;
     let r20 = this.users.filter(m020 => m020.edad >= 0 && m020.edad<=20);
     this.casosedades.m020 = r20.length;
      let r40 = this.users.filter(m040 => m040.edad >20 && m040.edad<=40);
     this.casosedades.m2040 = r40.length;
      let r40p = this.users.filter(m0 => m0.edad >40);
     this.casosedades.m40plus = r40p.length;

      let hola = [], orden = [];
        const departamentoindividual = [];
        let departamentorepetidos = [];
        let contador = 1;
        this.users.map(element => {
         hola.push(element.ciudad_municipio_nom)
        });
         
         orden = hola.sort();
        

       for(let i = 0; i < orden.length; i++){
         if(orden[i+1] === orden[i]){
         contador++;
         }else{
           departamentoindividual.push(orden[i]);
           departamentorepetidos.push(contador);
           contador = 1;
         }
       }
       let ciudad = departamentoindividual.map((_,index) => ({'ciudad' : departamentoindividual[index] }));
       let covid19 = departamentorepetidos.map((_,index) => ({'covid19' : departamentorepetidos[index] }));
       let union = _.zip(ciudad, covid19)
      departamentorepetidos = departamentorepetidos.sort((a,b)=>(a>b)?-1:(a<b)?1:0);
      console.log(departamentorepetidos);

       let unir = union.map((oe)=>{
        return Object.assign(oe[0], oe[1])

       })
       unir = _.orderBy(unir,['covid19'],['desc'])
       this.tabla = unir.slice(0,5);
        this.casosciudades = unir;
     }).catch(e => console.log(e));
   
},
  data(){
  return{
    chartOptions: {
        hoverBorderWidth: 20
      },
      chartDatagenero: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["hombres", "mujeres"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#41B883", "#E46651"],
            data: [520,480]
          }
        ]
      },
       chartDataedad: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["0-20", "20-40", "40+"],
        datasets: [
          {
            label: "Data two",
            backgroundColor: ["#41B883", "#E46651", "#6D6868"],
            data: [61,448,491]
          }
        ]
      },

    casosgenero:{
      hombre : 1,
      mujer :1,
    },
      casosedades:{
      m020 : 0,
      m2040: 0,
      m40plus : 0,
    },
    casosciudades:[],
    tabla:{
      ciudades:[],
      datosciudades:[]
    },
    users:[],
     
  }
  },
  props: {
    msg: String
  },

}
</script>


<style scoped>
*{
  margin: 0;
  padding: 0;
}
.tabla{
  margin-top: 40px;
}
.col-md-4{
  margin-right: 100px;
}
.hola{
  text-align: center;
}
h3 {text-align: center;
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>












