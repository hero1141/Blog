<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Aktualizuj</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="profile.avatar" prepend-icon="person" name="avatar" label="Link do awatara" type="text"></v-text-field>
                  <v-textarea v-model="profile.description" prepend-icon="person" name="description" label="Opis" type="text"></v-textarea>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" v-on:click="onFormSubmit">Zapisz</v-btn>
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
  created: function() {
    this.fetchProfile();
  },
  data: () => {
    return {
      profile: {},
      user: localStorage.getItem('token'),
      email: '',
      password: ''
    };
  },
  methods: {
    fetchProfile: function() {
        this.$store.dispatch('getProfile', localStorage.getItem('id')).then(() => {
            this.profile = this.$store.state.profile;
        });
    },
    onFormSubmit: function() {
      this.$store.dispatch('updateProfile', {profile: this.profile, id: localStorage.getItem('id')}).then(() => {
          if (this.$store.state.profile.id) {
            this.$toaster.success('Zaktualizowano profil!');
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