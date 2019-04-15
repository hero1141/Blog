<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Zaloguj się do panelu administratora</v-toolbar-title>
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
                <v-btn color="primary" v-on:click="onFormSubmit">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import 'v-toaster/dist/v-toaster.css'
Vue.use( require('v-toaster') );

@Component({
  components: {
    HelloWorld,
  },
})
export default class Login extends Vue {
  props: {
    
  };
  data (): any {
    return {
      email: '',
      password: ''
    };
  }
  onFormSubmit (): void {
    fetch('http://localhost:3000/auth/login', {
      method: "post",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        email: this.email,
        password: this.password
      })
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          localStorage.setItem('token', data.token);
          this.authenticateUser();
          this.$router.push('/');
        });
      }
      else {
        this.$toaster.error('Wrong email or password');
      }
    });
  }
}
</script>
<style lang="scss">
.v-toaster {
  top:75px;
}

</style>