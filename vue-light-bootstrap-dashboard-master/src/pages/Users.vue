<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Table of Users </h4>
              <br>
              <br>
              <label for="" style="color:black;">Search</label>
              <br>
              <input type="text" v-model="search">
            </template>

        <b-modal id="add" title="Add Element">
                             
           <input type="hidden" name="" value=''/>
           <form action="" @submit="addUser">
              <br>
              <label for=""> Name</label>
              <input type="text" class="form-control" v-model="newName"/>
              <br>
              <label for=""> Email</label>
              <input type="text" class="form-control" v-model="newEmail" />
              <label for="">Role</label>
              <input type="text" class="form-control" v-model="newRole" />
              <label for="">Password</label>
              <input type="text" class="form-control" v-model="newPassword" />
              <br>
                  <input size="sm" variant="success" type="submit"  value="Submit">


           </form>
                   <template #modal-footer>
                    <b></b>             
                   </template>

        </b-modal>
      <img v-b-modal="'add'"  src="/images/add.png" style="margin-left:90%;" alt=""> 
 <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Action</th>
         
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers  " v-bind:key="user.id">
         <td style="padding-right:50px;">{{user.id }}</td>
          <td style="padding-right:50px;">{{user.name }}</td>
          <td style="padding-right:50px;">{{user.email}}</td>
           <td style="padding-right:50px;">{{user.is_admin}}</td>

          <td> <img src="/images/del.png"  @click="delUser(user.id)"/>

               <img v-b-modal="user.name"  src="/images/edit.png"  alt=""> 

                    <b-modal :id="user.name" title="Update USER">
                             
                                    <input type="hidden" :name="'id'+user.id" :value='user.id'/>
                                    <label >Name</label>
                                    <input type="text" class="form-control" :id="'name'+user.id"  :value="user.name" />
                                    <br>
                                     <label >email</label>
                                    <input type="text" class="form-control" :id="'email'+user.id"  :value="user.email" />
                                    <br>
                                     <label>Role</label>
                                    <input type="text" class="form-control" :id="'is_admin'+user.id"  :value="user.is_admin" />
                              <template #modal-footer>
                                          <b></b>
                                          <b-button size="sm" style="marginRight:400px !important;" variant="success" @click="updateUser(user.id)">
                                          update
                                          </b-button>
                
             
                             </template>
                   </b-modal>
          </td>
  
        </tr>
      </tbody>          
    </table>

<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#" @click="PreviousPage()">Previous</a></li>
    <li class="page-item"><a class="page-link" href="#" @click="change(0)">1</a></li>
    <li class="page-item"><a class="page-link" href="#" @click="change(1)">2</a></li>
    <li class="page-item"><a class="page-link" href="#" @click="change(2)">3</a></li>
    <li class="page-item"><a class="page-link" href="#" @click="NextPage()">Next</a></li>
  </ul>
</nav>


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
            users :[],
            newUser:"",
            updatedUserName:"",
            updatedUserEmail:"",
            updatedUserRole:"",
            token : "",
            user:null,
            newEmail:"",
            newName:"",
            newRole:"",
            newPassword:"",
            search:'',
            cPage:1,
      }
    },

created(){
  this.fetchUsers();
},
computed:{
  filteredUsers:function(){
     return this.users.filter((user)=>{
       return user.name.match(this.search);
     });
  }
},
    methods:{

        PreviousPage(){
          if(this.cPage>0){
          this.cPage--;
                 axios.get(`http://localhost:8000/api/project/${this.cPage}`).then(res=>{
                console.log(res.data[1]);
                this.projects= res.data[0];
                this.cPage=res.data[1];
              });
            }
        },
        NextPage(){
          if(this.projects.length !=0){
                this.cPage++;
                axios.get(`http://localhost:8000/api/project/${this.cPage}`).then(res=>{
                console.log(res.data[1]);
                this.projects= res.data[0];
                this.cPage=res.data[1];
              });
            }
        },
        change(currentPage){

            axios.get(`http://localhost:8000/api/project/${currentPage}`).then(res=>{
                console.log(res.data[1]);
                this.projects= res.data[0];
                this.cPage=res.data[1];
              });
              },
             
      
        fetchUsers(){
            axios.get(`http://localhost:8000/api/users`).then(res=>{
                console.log(res.data.data);
                this.users= res.data.data;
               // this.cPage=res.data[1];
              });
         },
         addUser(e){
            e.preventDefault();
            const newUser ={

                  name:this.newName,
                  email:this.newEmail,
                  password:this.newPassword,
                  is_admin:this.newRole
        
            };
               axios.post('http://localhost:8000/api/user',newUser).then(res =>{this.users.push(res.data.data[0]);})
          
 
     },

         delUser(id){
               console.log(id)
            if(confirm("are you sure ?")){
                  axios.delete(`http://localhost:8000/api/user/${id}`).then(() => {

                        this.users=this.users.filter(
                           ({ id:i })=> i !== id
                        );
                  }).catch((err)=> console.log(err))
            }
         },



     editUser (id, name,email,is_admin) {
            return this.users.map(item => {
                  
                  if (item.id === id) {
                        item.name = name;
                        item.email = email;
                        item.is_admin= is_admin;
                  }
                  return item;
            });
            },

        updateUser(id){
            console.log(id);
            const updatedUser ={
                  id:id,
                  name: document.getElementById('name'+id).value,
                  email:document.getElementById('email'+id).value,
                  is_admin:document.getElementById('is_admin'+id).value
            };
             axios.put('http://localhost:8000/api/user',updatedUser).then(()=>{
                  this.editUser(id,document.getElementById('name'+id).value,document.getElementById('email'+id).value,document.getElementById('is_admin'+id).value)
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
