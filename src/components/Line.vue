<template>
  <div>
  <div class="row justify-content-md-center col-md-12 hola">
    <div class="col-md-4">
      <h3 >Generos covid 19</h3>
  <br>
  <br>



    <canvas class="circular"></canvas>
    <h3>{{hombre}} hombres</h3>
    <h3>{{mujer}} mujeres</h3>
  </div>
    <div class="col-md-4">
      <h3 >Covid 19 por edad</h3>
  <br>
  <br>
    <canvas class="excir"></canvas>
    <h3>{{m020}} de 0 a 20 años</h3>
    <h3>{{m2040}} de 20 a 40 años</h3>
    <h3>{{m40plus}} de 40 años en adelante</h3>
  </div>
    </div>
  <div class="row justify-content-md-center tabla ">
      <h3 >Ciudades con mas Casos covid 19</h3>
  <br>
  <br>
    <div class="col-md-6">
  <canvas id="myChart"></canvas>
    </div>
  </div>


<form name='form' id="form" class='formre needs-validation' v-on:submit.prevent="addUser">
   <h4 class='i'>Agregar Dato</h4>
   <div >
   <h3  class='ajust'> Sexo </h3>
   <select  name='sexo' v-model="nuevoUser.sexo"  class='inputr' required>
  <option value="M">Hombre</option>
  <option value="F">Mujer</option>
</select>


   </div>
   <div class='gridform'>
   <h3 class='ajust'> Ciudad </h3>
    <select name='ciudad' class='inputr' v-model="nuevoUser.ciudad_municipio_nom" required>
   <option v-for="depart in departamento " v-bind:key="depart" >{{depart}}</option>
</select>
   </div>
   <div>
   <h3 class='ajust'>Fecha De Contagio</h3>
   <input name='fecha' class='inputr' type='date' v-model="nuevoUser.fecha"  required>
   </div>
   <div class='gridform'>
   <h3 class='ajust'>Departamento</h3>
  <select  name='departamento' class='inputr' v-model="nuevoUser.departamento_nom" required>
   <option v-for="(ciud,index) in ciudad " v-bind:key="index">{{ciud}}</option>
</select>
  </div>
  <div>
   <h3 class='ajust'>Edad</h3>
   <input name='edad' class='inputr' type='text' placeholder='edad' v-model="nuevoUser.edad" required>
   </div>


   <button class='buttonregi' type='submit'>Igresar Registro</button>
    </form>




<form name='farm' id="farm" class='formra' v-on:submit.prevent="buscartodo">
 <table class="table table-dark table-striped " >
<thead>
    <tr>
      <th scope="col" style="text-align:center">genero</th>
      <th scope="col" style="text-align:center">ciudad</th>
      <th scope="col" style="text-align:center">estado</th>
      <th scope="col"></th>
        <th scope="col"></th>
    </tr>
    
  </thead>
  <tbody>
    <tr>
      <td><select name='sexo' v-model="buscador.sexo"  class='inputr' >
  <option value="M">Hombre</option>
  <option value="F">Mujer</option>
</select></td>
      <td><select name='ciudad' class='inputr' v-model="buscador.ciudad_municipio_nom">
   <option v-for="depart in departamento " v-bind:key="depart" >{{depart}}</option>
</select></td>
      <td><select  name='departamento' class='inputr' v-model="buscador.departamento_nom">
   <option v-for="(ciud,index) in ciudad " v-bind:key="index">{{ciud}}</option>
</select></td>
<td><button class='btn btn-primary boton-table' type='submit'>buscar</button></td>
      <td><button v-on:click="borrarfiltro" type="button" class="btn btn-danger boton-table">borrar</button></td>
      
    </tr>
  </tbody>
</table>
</form>
<br><br><br>

    <table class="table table-dark table-striped" v-if="mostrar" >
<thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Ciudad</th>
      <th scope="col">Departamento</th>
      <th scope="col">sexo</th>
      <th scope="col">edad</th>
      <th scope="col">editar</th>
      <th scope="col">Borrar</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="todo in todos " v-bind:key="todo.id_de_caso">

      <td>{{todo.id_de_caso}}</td>
      <td>{{todo.ciudad_municipio_nom}}</td>
      <td>{{todo.departamento_nom}}</td>
      <td>{{todo.sexo}}</td>
      <td>{{todo.edad}}</td>
      <td><button v-on:click="editar(todo.id_de_caso)" type="button" class="btn btn-primary boton-table">Editar</button></td>
      <td><button v-on:click="deleteUser(todo)" type="button" class="btn btn-danger boton-table">Delete</button></td>
    </tr>
    
  </tbody>
</table>


<table class="table table-dark table-striped" v-if="!mostrar" >
<thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Ciudad</th>
      <th scope="col">Departamento</th>
      <th scope="col">sexo</th>
      <th scope="col">edad</th>
      <th scope="col">editar</th>
      <th scope="col">Borrar</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="todo in temp " v-bind:key="todo.id_de_caso">

      <td>{{todo.id_de_caso}}</td>
      <td>{{todo.ciudad_municipio_nom}}</td>
      <td>{{todo.departamento_nom}}</td>
      <td>{{todo.sexo}}</td>
      <td>{{todo.edad}}</td>
      <td><button v-on:click="editar(todo.id_de_caso)" type="button" class="btn btn-primary boton-table">Editar</button></td>
      <td><button v-on:click="deleteUserbuscador(todo)" type="button" class="btn btn-danger boton-table">Delete</button></td>
    </tr>
    
  </tbody>
</table>




</div>
</template>


<script>

export default {
  name: "basic",
  props:{
    todos:Array,
    dato: Array,
    hombre:Number,
    mujer: Number,
    m020 : Number,
    m2040: Number,
    m40plus : Number,
    departamento : Array,
    ciudad : Array
  },
  methods:{
    buscartodo(){
       this.mostrar = 0;
       if(this.buscador.sexo && this.buscador.ciudad_municipio_nom && this.buscador.departamento_nom){
       this.temp = this.todos.filter(todo=> todo.sexo === this.buscador.sexo);
       this.temp = this.temp.filter(todo=> todo.ciudad_municipio_nom === this.buscador.ciudad_municipio_nom);
       this.temp = this.temp.filter(todo=> todo.departamento_nom === this.buscador.departamento_nom);
       }
       if(!this.buscador.sexo &&  this.buscador.ciudad_municipio_nom && this.buscador.departamento_nom){
       this.temp = this.todos.filter(todo=> todo.ciudad_municipio_nom === this.buscador.ciudad_municipio_nom);
       this.temp = this.temp.filter(todo=> todo.departamento_nom === this.buscador.departamento_nom);
       }

       if(this.buscador.sexo &&  this.buscador.ciudad_municipio_nom && !this.buscador.departamento_nom){
       this.temp = this.todos.filter(todo=> todo.sexo === this.buscador.sexo);
       this.temp = this.temp.filter(todo=> todo.ciudad_municipio_nom === this.buscador.ciudad_municipio_nom);
       }

       if(this.buscador.sexo && !this.buscador.ciudad_municipio_nom && this.buscador.departamento_nom){
       this.temp = this.todos.filter(todo=> todo.sexo === this.buscador.sexo);
       this.temp = this.temp.filter(todo=> todo.departamento_nom === this.buscador.departamento_nom);
       }

        if(!this.buscador.sexo && this.buscador.ciudad_municipio_nom && !this.buscador.departamento_nom){
       this.temp = this.todos.filter(todo=> todo.ciudad_municipio_nom === this.buscador.ciudad_municipio_nom);
       }
        if(!this.buscador.sexo && !this.buscador.ciudad_municipio_nom && this.buscador.departamento_nom){
       this.temp = this.todos.filter(todo=> todo.departamento_nom === this.buscador.departamento_nom);
       }
        if(this.buscador.sexo && !this.buscador.ciudad_municipio_nom && !this.buscador.departamento_nom){
       this.temp = this.todos.filter(todo=> todo.sexo === this.buscador.sexo);
       }
    
    
    

    },
   borrarfiltro(){
       this.mostrar = 1;
       this.buscador.ciudad_municipio_nom = '';
       this.buscador.departamento_nom = '';
       this.buscador.sexo = '';
       this.temp = {}
   },

    deleteUser(user){
    this.todos.splice(this.todos.indexOf(user),1);
    },
    deleteUserbuscador(user){
    this.todos.splice(this.todos.indexOf(user),1);
    },
    addUser(){
      let id = this.todos.length;
      this.todos.push(this.nuevoUser);
      this.nuevoUser = {id_de_caso: id+1};

    }
    },
  data(){
    return{
      totalM:()=>{
         let m =  this.todos.filter(todo => todo.sexo === 'F');
      return m.length;
      },
      totalH:()=>{
         let h =  this.todos.filter(todo => todo.sexo === 'M');
      return h.length;
      },
      totalm020:()=>{
         let t2 =  this.todos.filter(m020 => m020.edad >= 0 && m020.edad<=20);
      return t2.length;
      },
      totalm2040:()=>{
         let t4 =  this.todos.filter(m040 => m040.edad >20 && m040.edad<=40);
      return t4.length;
      },
      totalm40plus:()=>{
         let tm =  this.todos.filter(m0 => m0.edad >40);
      return tm.length;
      },
      mostrar:1,
      temp:{},
      nuevoUser:{
        indice: -1,
        id_de_caso: 0,
        edad: '',
        fecha: '',
        departamento_nom: '',
        ciudad_municipio_nom: '',
        sexo:'',
      },
      buscador:{
       ciudad_municipio_nom: '',
       departamento_nom: '',
       sexo: ''
      }
    }
  },

  mounted: function() {
    var ctx = document.getElementById("myChart");
    new this.$Chart(ctx, {
      type: "bar",
      data: {
        labels: [this.dato[0].ciudad,this.dato[1].ciudad,this.dato[2].ciudad,this.dato[3].ciudad,this.dato[4].ciudad],
        datasets: [
          {
            label: "top ranking",
            backgroundColor: ["#6D6868","#6D6868","#6D6868","#6D6868","#6D6868"],

            data: [this.dato[0].covid19,this.dato[1].covid19,this.dato[2].covid19,this.dato[3].covid19,this.dato[4].covid19],
            borderWidth: 1
          }
        ]
      },
      options: {
        plugins: {
          colorschemes: {
            scheme: "brewer.Pastel1-3"
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
    var cir = document.getElementsByClassName('circular');
    new this.$Chart(cir, {
      type: "doughnut",
      options: {
      borderWidth: "10px",
      hoverBackgroundColor: "red",
      hoverBorderWidth: "10px"
      },
      data: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["hombres", "mujeres"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#41B883", "#E46651"],
            data: [this.hombre, this.mujer]
          }
        ]
      }});
  var excir = document.getElementsByClassName('excir');
    new this.$Chart(excir, {
      type: "doughnut",
      options: {
      borderWidth: "10px",
      hoverBackgroundColor: "red",
      hoverBorderWidth: "10px"
      },
      data: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
       labels: ["0-20", "20-40", "40+"],
        datasets: [
          {
            label: "Data two",
            backgroundColor: ["#41B883", "#E46651", "#6D6868"],
            data: [this.m020,this.m2040,this.m40plus]
          }
        ]
      }});
}};
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}

.formre{
    
    box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.2);
    margin: auto;
    margin-top: 10%;
    margin-top: 100px;
    min-width: 200px;
    max-width: 1000px;
    padding: 30px;
    display: grid;
    grid-template-columns: repeat(2, 1fr); ;
    grid-template-rows: 1,200px, repeat(2, 1fr);
margin-bottom: 5rem;
    
   
}
.boton-table{
  font-size: 15px;
  padding: 5px;
}
.gridform{
    grid-column: 2/3;
}

.i{
    grid-column: 1/3;
    color: black;
    font-size: 40px;
    font-family: sans-serif;
    text-align: center;
}
.ajust{
    margin-right: 3.5rem;
    font-size: 22px;
    font-family: sans-serif;
    padding-bottom: 20px;
}


.inputr{
    width: 300px;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 16px;
    margin-left: 3.5rem;
    border: 1px solid black;
    font-size: 18px;
    font-family: 'calibri';
}



.buttonregi{

    width: 80%;
    grid-column: 1/3;
    background: black;
    border: none;
    padding: 12px;
    color: white;
    margin: 25px auto;
    margin-right: 7rem;
    
    font-size: 18px;
}

@media (max-width: 770px) {
    .formre{
       display: flex;
       flex-direction: column;
        }
        .i{
            margin-left: 0px;
            color: black;
            font-size: 40px;
            font-family: sans-serif;
            padding-bottom: 60px;
            text-align: center;
        }
        .ajust{
            text-align: center;
            margin-left: 0px;
            font-size: 22px;
            font-family: sans-serif;
            padding-bottom: 20px;
        }
        .inputr{
          width: 85%;
           margin-left: 4%;
   
        
        }
   .buttonregi{

    width: 90%;
   
}
    
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
.table{
  width: 70%;
  margin: 0 auto;
}
</style>

