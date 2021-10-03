<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Table of Projects </h4>
              <input type="text" v-model="search">
              <button @click="logout()">logout</button>
            </template>

        <b-modal id="add" title="Add Element">
                             
           <input type="hidden" name="" value=''/>
           <form action="" @submit="addProject">
              <br>
              <label for=""> Name</label>
              <input type="text" class="form-control" v-model="newName"/>
              <br>
              <label for=""> Description</label>
              <input type="text" class="form-control" v-model="newDescription" />
              <br>
                  <input size="sm" variant="success" type="submit" value="Submit">
           </form>
        
        </b-modal>
      <img v-b-modal="'add'"  src="/images/add.png" style="margin-left:90%;" alt=""> 
 <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">name</th>
          <th scope="col">description</th>
          <th scope="col">finished</th>
          <th scope="col">Action</th>
         
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in filteredProjects  " v-bind:key="project.id">
         <td style="padding-right:50px;">{{project.id }}</td>
          <td style="padding-right:50px;">{{project.name }}</td>
          <td style="padding-right:50px;">{{project.description}}</td>
           <td style="padding-right:50px;">{{project.finished}}</td>

          <td> <img src="/images/del.png"  @click="delProject(project.id)"/>

               <img v-b-modal="project.name"  src="/images/edit.png"  alt=""> 

                    <b-modal :id="project.name" title="Update Project">
                             
                                    <input type="hidden" :name="'id'+project.id" :value='project.id'/>
                                    <label >Name</label>
                                    <input type="text" class="form-control" :id="'name'+project.id"  :value="project.name" />
                                    <br>
                                     <label >Description</label>
                                    <input type="text" class="form-control" :id="'description'+project.id"  :value="project.description" />
                                    <br>
                                     <label >Finished</label>
                                    <input type="text" class="form-control" :id="'finished'+project.id"  :value="project.finished" />
                              <template #modal-footer>
                                          <b></b>
                                           Emulate built in modal footer ok and cancel button actions 
                                          <b-button size="sm" variant="success" @click="updateProject(project.id)">
                                          update
                                          </b-button>
                
             
                             </template>
                   </b-modal>
          </td>
  
        </tr>
      </tbody>          
    </table>

 <!-- <b-table
      :items="filteredProjects "
      :fields="fields"
      stacked="md"
      show-empty
      small
    >


      <template #cell(actions)="row" >
      <img v-b-modal="'add'"  src="/images/add.png" style="margin-left:90%;" alt=""> 

   
      </template>

      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
    </b-table> -->



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
            projects :[],
            newProject:"",
            updatedProjectName:"",
            updatedProjectDesc:"",
            updatedProjectFinished:"",
            token : "",
            user:null,
            newDescription:"",
            newName:"",
            search:'',
            fields: [
                    { key: 'name', label: 'Person full name'},
                    { key: 'description', label: 'description', sortable: true, class: 'text-center' },
                    
        ]
      }
    },

created(){
  this.fetchProject();
},
computed:{
  filteredProjects:function(){
     return this.projects.filter((project)=>{
       return project.name.match(this.search);
     });
  }
},
    methods:{
       info(item, index, button) {
          this.infoModal.title = `Row index: ${index}`
          this.infoModal.content = JSON.stringify(item, null, 2)
          this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
        fetchProject(){
               fetch('http://localhost:8000/api/project')
               .then( (res) => res.json())
                .then(({data})=>{
                     console.log(data)
                  this.projects= data;

               } )  
               .catch((err)=>console.log(err));
         },
         addProject(e){
            e.preventDefault();
            const newProject ={
                  name:this.newName,
                  description:this.newDescription,
                  finished:false 
        
            };
               axios.post('http://localhost:8000/api/project',newProject).then(()=>{this.projects.push(newProject);})
          
 
     },

         delProject(id){
               console.log(id)
            if(confirm("are you sure ?")){
                  axios.delete(`http://localhost:8000/api/project/${id}`).then(() => {

                        this.projects=this.projects.filter(
                           ({ id:i })=> i !== id
                        );
                  }).catch((err)=> console.log(err))
            }
         },

         checkedUpcoming(id){
              console.log()
         },

     editProject (id, name,description,finished) {
            return this.projects.map(item => {
                  
                  if (item.id === id) {
                        item.name = name;
                        item.description = description;
                        item.finished= finished;
                  }
                  return item;
            });
            },

        updateProject(id){
            console.log(id);
            const updatedProject ={
                  id:id,
                  name: document.getElementById('name'+id).value,
                  description:document.getElementById('description'+id).value,
                  finished:document.getElementById('finished'+id).value
            };
             axios.put('http://localhost:8000/api/project',updatedProject).then(()=>{
                  this.editProject(id,document.getElementById('name'+id).value,document.getElementById('description'+id).value,document.getElementById('finished'+id).value)
                  })
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
