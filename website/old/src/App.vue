<template>
  <v-app>
    <Navbar
      :user="user"
      :logout="logout">

    </Navbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Navbar from './components/navbar';

export default {
  name: 'App',
  components: {
    HelloWorld,
    Navbar
  },
  data () {
    return {
      user: localStorage.getItem('token') || null
    };
  },
  methods: {
    logout: () => {
      localStorage.removeItem('token');
      user = null;
    }
  }
}
</script>
