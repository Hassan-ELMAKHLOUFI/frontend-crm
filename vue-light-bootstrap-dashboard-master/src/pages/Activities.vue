<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Users Activities Table </h4>
              <br>
              <label style="color: black;" for="">Search</label>
              <br>
              <input type="text" v-model="search">
            </template>


 <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Action</th>
          <th scope="col">description</th>
          <th scope="col">Date</th>
          <th scope="col">user id</th>
         
        </tr>
      </thead>
      <tbody>
        <tr v-for="Activity in Activities" v-bind:key="Activity.id">
         <td style="padding-right:50px;">{{Activity.id }}</td>
         <td style="padding-right:50px;">{{Activity.name }}</td>
         <td style="padding-right:50px;">{{Activity.description}}</td>
         <td style="padding-right:50px;">{{Activity.created_at}}</td>
         <td style="padding-right:50px;">{{Activity.user_id}}</td>


  
        </tr>
      </tbody>          
    </table>



          </card>

        </div>




      </div>
    </div>


  
  </div>
</template>
<script>
  import LTable from 'src/components/Table.vue'
  import Card from 'src/components/Cards/Card.vue'
  window.axios = require('axios');
  export default {
    components: {
      LTable,
      Card
    },
    data () {
      return {
            Activities :[],
            user:null,

            search:'',

      }
    },

created(){
  this.fetchActivities();
},
computed:{
  filteredActivities:function(){
     return this.Activities.filter((Activity)=>{
       return Activity.name.match(this.search);
     });
  }
},
    methods:{

        fetchActivities(){
    
               fetch('http://localhost:8000/api/activity')
               .then( (res) => res.json())
                .then(({data})=>{
                     console.log(data)
                     this.Activities= data;

               } )  
               .catch((err)=>console.log(err));
         },




 
        logout(){
          axios.post('http://localhost:8000/api/logout').then(()=>{
              this.$router.push({name:'login'});
          })
      }

        
    }
  }
</script>
<style>
</style>
