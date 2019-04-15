<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Zaloguj się</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="email" prepend-icon="person" name="email" label="Email" type="text"></v-text-field>
                  <v-text-field v-model="password" id="password" prepend-icon="lock" name="password" label="Hasło" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" v-on:click="onFormSubmit">Zaloguj</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import 'v-toaster/dist/v-toaster.css'
Vue.use( require('v-toaster'), {timeout: 2000 });

export default {
  name: 'Login',
  components: {
    HelloWorld
  },
  props: [
    'authenticateUser'
  ],
  data: () => {
    return {
      user: localStorage.getItem('token'),
      email: '',
      password: ''
    };
  },
  methods: {
    onFormSubmit: function() {
      this.$store.dispatch('login', {email: this.email, password: this.password}).then(() => {
        if (this.$store.getters.isLogged === 1) {
          this.$toaster.success('Zalogowano pomyślnie');
          this.$router.push('/');
        } else {
          this.$toaster.error('Niepoprawne dane logowanie');
        }
      });
    }
  }
}
</script>
<style lang="scss">
.v-toaster {
  top:75px;
}

</style>