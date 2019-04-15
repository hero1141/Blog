<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Wyślij wiadomość</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="email" prepend-icon="person" name="email" label="Email" type="text"></v-text-field>
                  <v-text-field v-model="message" id="message" prepend-icon="message" name="password" label="Wiadomość" type="text"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" v-on:click="onSendMessage">Wyślij wiadomość</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
// @ is an alias to /src
import Vue from 'vue';
import 'v-toaster/dist/v-toaster.css'
Vue.use( require('v-toaster'), {timeout: 2000 });
export default {
  name: 'Message',
  created: function() {
    const { id } = this.$route.params;
  },
  data() {
    return {
      id: this.$route.params.id,
      email: '',
      message: '',
    };
  },
  methods: {
    onSendMessage: function() {
      this.$store.dispatch('sendMessage', {email: this.email, message: this.message, user: this.id}).then(() => {
        this.$toaster.success('Wiadomość została wysłana!');
        this.$router.push('/');
      });
    }
  }
}
</script>
