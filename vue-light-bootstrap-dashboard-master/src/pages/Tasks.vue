<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Table of upcoming Tasks </h4>
                <input type="text" v-model="search">
                <p>{{this.search}}</p>
            </template>
        <b-modal id="add" title="Add Element">
          
           <input type="hidden" name="" value=''/>
           <form action="" @submit="addUpcomingTask">
               <label for="">Title</label>
              <input type="text" class="form-control"  style="border: solid 1px black !important; marginBottom:20px !important; marginTop:0px !important;" v-model="newTitle"/>
              <label for="">Date</label>
              <input type="date" class="form-control"  style="border: solid 1px black !important; marginBottom:20px !important; marginTop:0px !important;" v-model="newDate" />
           <label for="">Project</label>
            <select type="date" class="form-control"  style="border: solid 1px black !important; marginBottom:20px !important; marginTop:0px !important;"  v-model="selected">
                <option v-for="option in options" v-bind:key="option.value" :value="option.id">
                {{ option.name }}
                </option>
            </select>
            <br>
                     <input size="sm" variant="success" style="backgroundColor: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  textAlign: center;
  textDecoration: none;
  fontSize: 16px;
  cursor: pointer;" type="submit"  value="Submit">
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
          <th scope="col">title</th>
          <th scope="col">dead line</th>
          <th scope="col">Action</th>
         
        </tr>
      </thead>
      <tbody>
        <tr v-for="upcomingtask in filteredUpcoming" v-bind:key="upcomingtask.id">
          <td scope="row" style="padding-top:10px;">  
                   <label class="myCheckbox">
                     <input 
                        type="checkbox" name="test" 
                        :checked="upcomingtask.completed"
                        @change="checkedUpcoming(upcomingtask.id)"/>
                                      
                                       <span></span>
                                </label>
            </td>
          <td style="padding-right:50px;">{{upcomingtask.title }}</td>
          <td style="padding-right:50px;">{{upcomingtask.deadline}}</td>
          <td> <img src="/images/del.png"  @click="delUpcoming(upcomingtask.id)"/>

               <img v-b-modal="upcomingtask.title"  src="/images/edit.png"  alt=""> 
                    <b-modal :id="upcomingtask.title" title="BootstrapVue">
                             
                                    <input type="hidden" :name="'id'+upcomingtask.id" :value='upcomingtask.id'/>
        
                                    <input type="text" class="form-control"  style="border: solid 1px black !important; marginBottom:20px !important; marginTop:0px !important;" :id="'id'+upcomingtask.id"  :value="upcomingtask.title" />
                              <template #modal-footer>
                                         
                                          <b-button size="sm"  variant="success" @click="updateUpcomingTask(upcomingtask.id)">
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
            horizontalImg:"/images/horizontal.png",
            todayTask:[],
            upcoming :[],
            newTask:"",
            updatedTask:"",
            token : "",
            user:null,
            newDate:"",
            newTitle:"",
            selected: 'A',
            options: [],
            newProject:"",
            search:'',
            cPage :1
      }
    },

created(){
  this.fetchUpcoming();
  this.fetchprojects();
},

computed:{
  filteredUpcoming:function(){
     return this.upcoming.filter((task)=>{
       return task.title.match(this.search);
     });
  }
},
    methods:{

       PreviousPage(){
          if(this.cPage>0){
          this.cPage--;
                 axios.get(`http://localhost:8000/api/upcoming/${this.cPage}`).then(res=>{
                console.log(res.data[1]);
                this.upcoming= res.data[0];
                this.cPage=res.data[1];
              });
            }
        },
        NextPage(){
          if(this.upcoming.length !=0){
                this.cPage++;
                axios.get(`http://localhost:8000/api/upcoming/${this.cPage}`).then(res=>{
                console.log(res.data[1]);
                this.upcoming= res.data[0];
                this.cPage=res.data[1];
              });
            }
        },
        change(currentPage){

            axios.get(`http://localhost:8000/api/upcoming/${currentPage}`).then(res=>{
                console.log(res.data[1]);
                this.upcoming= res.data[0];
                this.cPage=res.data[1];
              });
              },

        fetchprojects(){
               fetch('http://localhost:8000/api/project')
               .then( (res) => res.json())
                .then(({data})=>{
                     console.log(data)
                  this.options= data;

               } )  
               .catch((err)=>console.log(err));
         },

        fetchUpcoming(){
            axios.get(`http://localhost:8000/api/upcoming/0`).then(res=>{
                console.log(res.data[0]);
                this.upcoming= res.data[0];
                this.cPage=res.data[1];
              });
         },
         addUpcomingTask(e){
            e.preventDefault();
            const newTasks ={
                  title:this.newTitle,
                  completed:false ,
                  approved:false,
                  waiting:true,
                  deadline:this.newDate,
                  project_id:this.selected
            };
               axios.post('http://localhost:8000/api/upcoming',newTasks).then(()=>{this.upcoming.push(newTasks);})
          
 
     },

         delUpcoming(id){
               console.log(id)
            if(confirm("are you sure ?")){
                  axios.delete(`http://localhost:8000/api/upcoming/${id}`).then(() => {

                        this.upcoming=this.upcoming.filter(
                           ({ id:i })=> i !== id
                        );
                  }).catch((err)=> console.log(err))
            }
         },

         checkedUpcoming(id){
              console.log()
         },
         //Today Task method 
        fetchTodayTasks(){

        },
     editTaskTitle (id, title) {
            return this.upcoming.map(item => {
                  
                  if (item.id === id) {
                        item.title = title;
                  }
                  return item;
            });
            },

        updateUpcomingTask(id){
            console.log(id);
            const updatedTasks ={
                  id:id,
                  title: document.getElementById('id'+id).value,
                  
                  completed:false ,
                  approved:false,
                  waiting:true
            };
             axios.put('http://localhost:8000/api/upcoming',updatedTasks).then(()=>{
                  this.editTaskTitle(id,document.getElementById('id'+id).value)
                  this.updatedTask=""})
        }

        
    }
  }
</script>

<style  scoped lang="scss">
   @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap');


:root {
    --primary1: #15172B;
    --primary2: #262A41;
    --customblue: #0026FF;
    --custompink: #FF3250;
    --customeyellow: #FFBB00;
    --customgreen: #07E642;
    --custompurple: #894FC6;
    --customdarkblue: #121432;
    --white: #ffffff;
    --customgrey: #707070;
    --customgreen1: #15D4A1;
}

input [type=checkbox]:checked+span:before {
    content: '\2714';
    @extend .middle ;
    height: 20px;
    width: 20px;
    border-radius: 50px ;
    border: 2px solid var(--customgreen1);
    background-color: var(--customgreen1);
    opacity: 1;
    font-size: 12px;
    top: 45%;
    color: #fff;
}
input {
    border: unset;
    padding: 0.2em;
    background-color: transparent;
    width: 100%;
    height: 100%;
    caret-color: var(--white);

    &::placeholder {
        background-color: unset !important;
        color: var(--customgrey) !important;
        font-family: 'Open Sans', sans-serif;
        font-size: 14px;
    }
}

body {
    position: relative;
    font-family: "MyriadProRegular";
    background-color: var(--primary1);

    &::-webkit-scrollbar {
        display: none;
        scrollbar-width: none;
    }
}

input [type=checkbox]:checked+span:before {
    content: '\2714';
    @extend .middle ;
    height: 20px;
    width: 20px;
    border-radius: 50px ;
    border: 2px solid var(--customgreen1);
    background-color: var(--customgreen1);
    opacity: 1;
    font-size: 12px;
    top: 45%;
    color: #fff;
}
.middle {
    transition: 0.5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
    z-index: 1;
}


.mcontainer {
    #body {
        display: grid;
        grid-template-columns: 40% 60%;
        grid-template-areas: "Left Right";
        padding: 16px;

        #left{
            grid-area: Left;
            padding: 15%;
            position: relative;

            .hamburger {
                position: absolute;
                top: 0%;
                left: 2%;
                cursor: pointer;
            }

            .profile {
                margin-top: 5px;

                h1 {
                    font-family: 'Open Sans', sans-serif;
                    font-size: 34px;
                    color: var(--white);
                    font-weight: 500;
                    text-transform: capitalize;
                }

                h2 {
                    font-family: 'Open Sans', sans-serif;
                    font-size: 16px;
                    color: var(--customgrey);
                    font-weight: 300;
                }
            }

            .search {
                border: unset;
                border-radius: 14px;
                padding: 17px 25px;
                padding-left: 55px;
                margin-top: 39px;
                position: relative;
                background-color: #a5787850 !important;
                height: 53px;
                margin-bottom: 35px;
                width: 90%;

                img {
                    @extend .middle;
                    opacity: 1;
                    left: 25px;
                    cursor: pointer;
                }


            }

            .project {
                margin-bottom: 70px;

                h3 {
                    font-family: 'Open Sans', sans-serif;
                    font-size: 19px;
                    color: var(--white) !important;

                    span {
                        font-size: 14px;
                        color: var(--customgrey);
                    }
                }

                .projects {
                    margin-top: 27px;
                    display: grid;
                    grid-template-columns: repeat(3, 112px);
                    grid-auto-flow: dense;

                    .a-project {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        cursor: pointer;
                        border-radius: 1em;
                        background-color: transparent;
                        margin-bottom: 1em;
                        padding: 0.5em;

                        span {
                            font-family: "MyriadProRegular";
                            font-size: 17px;
                            color: var(--white);
                            font-size: 900;
                        }

                        h6 {
                            margin-top: 16px;
                            font-family: 'Open Sans', sans-serif;
                            font-size: 14px;
                            color: var(--white);
                        }

                        div.box-color {
                            border-radius: 1em;
                            margin-bottom: 1px;
                            overflow: hidden;
                            position: relative;

                            span {
                                @extend .middle;
                                opacity: 1;
                            }

                            img {
                                width: 100%;
                                height: 100%;
                            }

                            &:hover {
                                border: 4px solid var(--custompink);
                                transition: border 400ms eas;
                            }
                        }

                        .customwidth {
                            width: 100px;
                            height: 94px !important;
                        }

                        &:nth-child(1) {
                            div.box-color {
                                background-color: var(--customblue) !important;
                                @extend .customwidth;
                            }
                        }

                        &:nth-child(2) {
                            div.box-color {
                                background-color: var(--custompink) !important;
                                @extend .customwidth;
                            }
                        }

                        &:nth-child(3) {
                            div.box-color {
                                background-color: var(--customeyellow);
                                @extend .customwidth;
                            }
                        }

                        &:nth-child(4) {
                            div.box-color {
                                background-color: var(--customgreen);
                                @extend .customwidth;
                            }
                        }

                        &:nth-child(5) {
                            div.box-color {
                                background-color: var(--custompurple);
                                @extend .customwidth;
                            }
                        }

                        &:nth-child(6) {
                            div.box-color {
                                background-color: var(--customblue);
                                @extend .customwidth;
                            }
                        }
                    }
                }
            }

            .grid {
                bottom: 0%;
                left: 0px;
                position: absolute;
            }

            .grid-right {
                top: 0%;
                right: -10%;
                position: absolute;
            }

        }

        #right {
            position: relative;
            grid-area: Right;
            background-color: #fff;
            border-radius: 15px;

            padding-top: 65px;
            padding-bottom: 85px;
            padding-left: 70px;
            padding-right: 20px;

            h1 {
                font-family: "MyriadProBold";
                font-size: 24px;
                font-weight: 400;
                margin-bottom: 10px;
            }

            .horizontal {
                img {
                    width: 122px
                }

                margin-bottom: 10px;
            }

            p {
                font-family: 'Open Sans', sans-serif;
                font-size: 12px;
                font-weight: 300;
                width: 500px;
            }

            .users-icon {
                position: absolute;
                right: 42px;
                top: 65px;
                cursor: pointer;

                img {
                    height: 30px;
                }
            }

            .tasks,
            .upcoming {
                margin-bottom: 1.3em;

                .add-tasks {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;

                    h2 {
                        font-family: "MyriadProBold";
                        font-size: 15px;
                        font-weight: 400;
                    }

                    img {
                        cursor: pointer;
                    }
                }

                input[type="text"] {
                    border: unset;
                    border-bottom: 1px solid var(--customgrey);
                    width: 100%;
                    caret-color: var(--primary1);
                }

                .tasks-list {
                    margin-top: 15px;

                    li {
                        display: flex;
                        flex-direction: column;

                        .info {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            cursor: pointer;
                            padding: 0.3em;
                            border-radius: 0.3em 3em;

                            &:hover {
                                background-color: #70707010;
                                transition: all 400ms ease-in-out;
                            }

                            .left {
                                display: flex;
                                flex-direction: row;
                                align-items: center;

                                label {
                                    cursor: pointer;
                                    margin-top: 0.3em;
                                    padding-top: 0.4em;


                                    input {
                                        display: none;
                                    }

                                    span {
                                        height: 20px;
                                        width: 20px;
                                        display: inline-block;
                                        position: relative;
                                        border-radius: 50px;
                                        border: 2px solid var(--customgreen1);
                                    }

                                }

                                h4 {
                                    margin-left: 15px;
                                    font-family: 'Open Sans', sans-serif;
                                    font-size: 13px;
                                    color: var(--primary2);
                                    font-weight: 600;
                                }
                            }

                            .right {
                                display: flex;
                                flex-direction: row;
                                align-items: center;
                                justify-content: space-between;

                                img {
                                    margin-right: 1em;
                                    cursor: pointer;
                                }

                                button {
                                    padding: 5px 31px;
                                    border-radius: 50px;
                                    border: unset;
                                    box-shadow: unset !important;
                                    width: 120px;
                                    font-family: 'Open Sans', sans-serif;
                                    font-size: 12px;
                                    white-space: nowrap;
                                }

                            }
                        }

                    }
                }
            }

        }
    }
}


.approved {
    background-color: #15D4A150;
    color: #15D4A1;
}

.inprogress {
    background-color: #0060FF20;
    color: #0060FF;
}

.rejected {
    background-color: #FF0E4620;
    color: #FF0E46;
}


   .mcontainer{
     background-color: rgb(14, 46, 73);
   } 
</style>


