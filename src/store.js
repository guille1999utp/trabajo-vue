import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import _ from 'lodash'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    casosgenero:{
      hombre : 0,
      mujer :0,
    },
      casosedades:{
      m020 : 0,
      m2040: 0,
      m40plus : 0,
    },
    casosciudades:[],
    casosdepartamentos:[],
    tabla:{
      ciudades:[],
      datosciudades:[]
    },
    users:[],
     
  }
  ,
  mutations: {
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
        
              let ciudado = [],orden = [],ciu =[],ciucom=[];
                const departamentoindividual = [];
                let departamentorepetidos = [];
                let contador = 1;
                this.users.map(element => {
                 ciudado.push(element.ciudad_municipio_nom)
                 ciu.push(element.departamento_nom)
                });
                 
                 orden = ciudado.sort();
                
        
               for(let i = 0; i < orden.length; i++){
                 if(orden[i+1] === orden[i]){
                 contador++;
                 }else{
                   departamentoindividual.push(orden[i]);
                   departamentorepetidos.push(contador);
                   contador = 1;
                 }
               }
              orden = ciu.sort();
                
        
               for(let i = 0; i < orden.length; i++){
                 if(orden[i+1] === orden[i]){
                 contador++;
                 }else{
                   ciucom.push(orden[i]);
                   contador = 1;
                 }
               }
        
        
        
               let ciudad = departamentoindividual.map((_,index) => ({'ciudad' : departamentoindividual[index] }));
               let covid19 = departamentorepetidos.map((_,index) => ({'covid19' : departamentorepetidos[index] }));
               let union = _.zip(ciudad, covid19)
              departamentorepetidos = departamentorepetidos.sort((a,b)=>(a>b)?-1:(a<b)?1:0);
              console.log();
        
               let unir = union.map((oe)=>{
                return Object.assign(oe[0], oe[1])
        
               })
               unir = _.orderBy(unir,['covid19'],['desc'])
               this.tabla = unir.slice(0,5);
                this.casosciudades = unir;
              this.casosdepartamentos = departamentoindividual;
              this.casosciudades = ciucom;
             }).catch(e => console.log(e));
            
        }
  
  }
})