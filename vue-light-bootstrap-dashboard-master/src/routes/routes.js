import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Overview from 'src/pages/Overview.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import Tasks from 'src/pages/Tasks.vue'
import Activities from 'src/pages/Activities.vue'
import Task from 'src/pages/task.vue'
import Typography from 'src/pages/Typography.vue'
import Icons from 'src/pages/Icons.vue'
import Maps from 'src/pages/Maps.vue'
import Notifications from 'src/pages/Notifications.vue'
import Upgrade from 'src/pages/Upgrade.vue'
import Projects from 'src/pages/Projects.vue'
import login from 'src/pages/login.vue'
import register from 'src/pages/register.vue'
import axios from 'axios';
window.axios = require('axios');

let axiosConfig = {
  headers: {
   'Accept': 'application/json'
  }
  };
const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview'
  },
  {
    path: '/task',
    name: 'task',
    component: Task,
    beforeEnter:(to,form,next)=>{
      axios.get('http://localhost:8000/api/isclient').then(()=>{
          next()
      }).catch(()=>{
          return next({name:'login'})
      })
  }
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register

  },



  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview,
        beforeEnter:(to,form,next)=>{
          axios.get('http://localhost:8000/api/isadmin').then(()=>{
              next()
          }).catch(()=>{
              return next({name:'login'})
          })
      }
      },



      {
        path: 'user',
        name: 'User',
        component: UserProfile
      },
      {
        path: 'tasks',
        name: 'tasks',
        component: Tasks,
        beforeEnter:(to,form,next)=>{
          axios.get('http://localhost:8000/api/isadmin').then(()=>{
              next()
          }).catch(()=>{
              return next({name:'login'})
          })
      }
      },
      {
        path: 'activities',
        name: 'activities',
        component: Activities,
        beforeEnter:(to,form,next)=>{
          axios.get('http://localhost:8000/api/isadmin').then(()=>{
              next()
          }).catch(()=>{
              return next({name:'login'})
          })
      }
      },



      {
        path: 'projects',
        name: 'projects',
        component: Projects,
        beforeEnter:(to,form,next)=>{
          axios.get('http://localhost:8000/api/isadmin').then(()=>{
              next()
          }).catch(()=>{
              return next({name:'login'})
          })
      }
      },
      {
        path: 'typography',
        name: 'Typography',
        component: Typography
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
