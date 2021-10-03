 import Vuex from 'vuex'
 import Vue from 'vue'
 import { SET_NOTE } from '@/store/mutation-types';

 Vue.use(Vuex)
// // Create a new store instance.
 const store = new Vuex.Store({
  state: {
    tasks:[{"id":1,"title":"Iste ipsam quisquam eligendi.","completed":0,"approved":0,"waiting":1,"deadline":"2010-09-29","project_id":1},
    {"id":2,"title":"Quod et qui praesentium.","completed":0,"approved":0,"waiting":1,"deadline":"2001-06-09","project_id":2},{"id":3,"title":"Dignissimos nulla autem rerum.","completed":0,"approved":0,"waiting":1,"deadline":"1997-07-23","project_id":3},{"id":4,"title":"Veritatis esse molestiae officiis.","completed":0,"approved":0,"waiting":1,"deadline":"1979-11-25","project_id":4},{"id":5,"title":"Iste rerum qui ut.","completed":0,"approved":0,"waiting":1,"deadline":"1989-01-31","project_id":5},{"id":6,"title":"testes","completed":0,"approved":0,"waiting":1,"deadline":"2021-09-23","project_id":2}]

  },
  getters: {
    getTasks(state) {
      return state.tasks;
    }
  },
  mutations: {
    setTasks (state, tasks) {
      state.tasks = tasks;
    }
  },
  actions: {
    setTasks({commit, state}, projectId) {
      let taskFound = [];
       state.tasks.forEach(function (task)  {
        if (projectId == task.project_id) {
          console.log("test")
          taskFound.push(task);
        }
      })
      commit('setTasks', taskFound);
    }
  }
})

export default store;