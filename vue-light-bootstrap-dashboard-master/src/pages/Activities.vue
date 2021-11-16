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
              <label  for="">Search</label>
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


  <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#" @click="PreviousPage()">Previous</a></li>
    <li class="page-item"><a class="page-link" href="#" @click="change(0)">1</a></li>
    <li class="page-item"><a class="page-link" href="#" @click="change(1)">2</a></li>
    <li class="page-item"><a class="page-link" href="#" @click="change(2)">3</a></li>
    <li class="page-item"><a class="page-link" href="#" @click="NextPage()">Next</a></li>
  </ul>
</nav>
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
            cPage:1

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
        PreviousPage(){
          if(this.cPage>0){
          this.cPage--;
                 axios.get(`http://localhost:8000/api/activity/${this.cPage}`).then(res=>{
                console.log(res.data[1]);
                this.Activities= res.data[0];
                this.cPage=res.data[1];
              });
            }
        },
        NextPage(){
          if(this.Activities.length !=0){
                this.cPage++;
                axios.get(`http://localhost:8000/api/activity/${this.cPage}`).then(res=>{
                console.log(res.data[1]);
                this.Activities= res.data[0];
                this.cPage=res.data[1];
              });
            }
        },
        change(currentPage){

            axios.get(`http://localhost:8000/api/activity/${currentPage}`).then(res=>{
                console.log(res.data[1]);
                this.Activities= res.data[0];
                this.cPage=res.data[1];
              });
              },






        fetchActivities(){
    
         axios.get(`http://localhost:8000/api/activity/0`).then(res=>{
                console.log(res.data[1]);
                this.Activities= res.data[0];
                this.cPage=res.data[1];
              });
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
