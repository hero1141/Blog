import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import VueResource from 'vue-resource';

Vue.config.productionTip = false

Vue.use(VueResource);

Vue.http.interceptors.push((request, next) => {
  if (localStorage.getItem('token')) {
    request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }
  next(response => {
    if (response.status === 400 || response.status === 401 || response.status === 402) {
      router.push({path: '/blog-admin'});
    }
  });
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
