<template>
  <v-app id="inspire">
    <v-navigation-drawer
    :clipped="$vuetify.breakpoint.lgAndUp"
    v-model="drawer"
    fixed
    app
  >
    <v-list dense>
      <template v-for="item in items">
        <v-layout
          v-if="item.heading"
          :key="item.heading"
          row
          align-center
        >
          <v-flex xs6>
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </v-flex>
        </v-layout>
        <v-list-group
          v-else-if="item.children"
          v-model="item.model"
          :key="item.text"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon=""
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
            <div v-for="(child, i) in item.children" :key="i" >
            <router-link :to="{path: child.url}">
              <v-list-tile>
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>           
            </v-list-tile>
           </router-link>
           </div>
        </v-list-group>
        <v-list-tile v-else :key="item.text">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    color="blue darken-3"
    dark
    app
    fixed
  >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">BLOG</span>
      </v-toolbar-title>
      <v-text-field
        flat
        v-on:keyup.enter.native="goSearch()"
        solo-inverted
        v-model="search"
        hide-details
        prepend-inner-icon="search"
        label="Szukaj..."
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <router-link to="/profile" v-if="isLogged">
        <v-btn icon>
          <v-icon>person</v-icon>
        </v-btn>
      </router-link>

      <v-btn icon large v-on:click="logout" v-if="isLogged">
        <v-avatar size="32px" tile>
          <img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          >
        </v-avatar>     
      </v-btn>
    </v-toolbar>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
    <v-btn
      v-if="isLogged"
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          Dodaj artykuł
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                prepend-icon="title"
                placeholder="Tytuł"
                v-model="article.title"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-select
                prepend-icon="category"
                v-model="article.category"
                :items="categories"
                item-value="id"
                item-text="name"
                attach
                chips
                label="Kategoria"
              ></v-select>
            </v-flex>
            <v-flex xs12>
               <v-text-field
                prepend-icon="image"
                v-model="article.imageUrl"
                placeholder="Miniaturka"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                prepend-icon="textsms"
                placeholder="Treść"
                v-model="article.content"
                hint="Wpisz treść"
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Anuluj</v-btn>
          <v-btn flat @click="onSaveArticle()">Zapisz</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Navbar from './components/navbar';
import Vue from 'vue';
import 'v-toaster/dist/v-toaster.css'
Vue.use( require('v-toaster'), {timeout: 2000 });
export default {
  name: 'App',
  beforeMount() {
    this.$store.dispatch("getCategories");
  },
  computed: {
    isLogged() {
      return this.$store.getters.isLogged;
    },
    categories() {      
      return this.$store.getters.categories;
    }
  },
  components: {
    HelloWorld,
    Navbar
  },
  data () {
    return {
      article: {},
      dialog: false,
      drawer: null,
      category: null,
      search: '',
      items: [
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Artykuły',
        model: false,
        
        children: [
          { icon: 'chrome_reader_mode', text: 'Wszystkie artykuły', url: "/articles" },
          { icon: 'category', text: 'Kategorie', url: "/categories"}
        ]
      },
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Magic',
        model: false,
        children: [
          { icon: 'games', text: 'Zasady gry', url: "/zasady" },
          { icon: 'info', text: 'FAQ', url: '/faq' },
        ]
      },
    ]
    };
  },
  props: {
    source: String,
  },
  methods: {
    goSearch: function() {
      this.$router.push({ path: `/articles?query=${this.search}`})
    },
    logout: function() {
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
    onSaveArticle: function() {
      const data = {
        ...this.article,
        user: localStorage.getItem('id')
      };
      this.$store.dispatch('saveArticle', data).then(() => {
        this.dialog = false;
        this.article = {};
        this.$toaster.success('Artykuł został dodany!');
      }).catch((err) => {
        console.log(err);
        this.$toaster.danger('Nie udało się dodać artykułu');
      });
    },
  }
}
</script>
<style>
 a {
   text-decoration: none;
 }
</style>