<template>
  <div class="hello">
    <pie-chart :data="chartData" :options="chartOptions"></pie-chart>
    <h1>{{ casosgenero.hombre()}} hombres</h1>
    <h1>{{ casosgenero.mujer()}} mujeres</h1>
    <h1>{{ casosedades.m020()}} de 0 a 20 años</h1>
    <h1>{{ casosedades.m2040()}} de 20 a 40 años</h1>
    <h1>{{ casosedades.m40plus()}} de 40 años en adelante</h1>
    <h1>{{ casosciudades.municipios()}} de 40 años en adelante</h1>
    
    <ul>
      <li v-for="(user,id_de_caso ) in users" :key="id_de_caso">
      {{user.ciudad_municipio}}

      </li>
    </ul>

    <canvas id="myChart" width="400" height="400"></canvas>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  name: 'HelloWorld',
  data(){
  return{

    casosgenero:{
      hombre : ()=>{
      const result = this.users.filter(hombre => hombre.sexo == 'M');
      return result.length;
      },
      mujer :()=>{
      const result = this.users.filter(mujer => mujer.sexo == 'F');
      return result.length;
      },
    },
      casosedades:{
      m020 : ()=>{
      const result = this.users.filter(m020 => m020.edad >= 0 && m020.edad<=20);
      return result.length;
      },
      m2040 :()=>{
      const result = this.users.filter(m020 => m020.edad > 20 && m020.edad<=40);
      return result.length;
      },
      m40plus :()=>{
      const result = this.users.filter(m020 => m020.edad > 40);
      return result.length;
      },
    },
casosciudades:{
      municipios : ()=>{

        let hola = [], orden = [];
        const departamentoindividual = [];
        const departamentorepetidos = [];
        const union = [];
        let contador = 1;
        this.users.map(element => {
         hola.push(element.ciudad_municipio)
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
       
       departamentoindividual.map((element, i) => {
         let ho = departamentorepetidos[i];
         union.push(element , ho);
        });


       console.log(departamentorepetidos)
       console.log(departamentoindividual)
       console.log(union)
        return union;
      }
    },

    users:[],



  }
  },
  props: {
    msg: String
  },
  methods:{
   
  },
  mounted(){
      axios.get('https://www.datos.gov.co/resource/gt2j-8ykr.json').then((res)=>{ 
        this.users = res.data;
   }).catch(e => console.log(e));

}
  
}
</script>

<style scoped>
h3 {
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
