<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm12 md12>
            <v-list two-line>
              <v-subheader                
                  key="Artykuły">
                  Artykuły
              </v-subheader>
              <template v-if="items.length > 0" v-for="(item, index) in items">            
                <v-list-tile
                  v-if="item.title"
                  :key="item.id"
                >
                  <v-list-tile-avatar>
                    <img :src="item.user.avatar">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <router-link :to="{path: `/article/${item.id}`}"><v-list-tile-title v-html="item.title"></v-list-tile-title></router-link>
                    <v-list-tile-sub-title v-html="`<span class='text--primary'>${item.user.firstName} ${item.user.lastName}</span> &mdash; ${item.category.name}`"></v-list-tile-sub-title>
                    <v-btn  v-on:click="onRemoveArticle(item.id)" v-if="userek == item.user.id" color="red" dark>Usuń
        <v-icon dark right>block</v-icon>
      </v-btn>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider
                  v-if="item.title"
                  :key="item.title"
                ></v-divider>
              </template>
            </v-list>            
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  name: 'Articles',
  watch: {
    '$route': function () {
      this.fetchArticles();
    },
  },
  created: function() {
    this.userek = localStorage.getItem('id'),
    this.fetchArticles();
  },
  data () {
    return {
      userek: localStorage.getItem('id'),
      items: []
    };
  },
    methods: {
    fetchArticles: function() {
      const { query } = this.$route.query;
      const { id } = this.$route.params;
      const { userId } = this.$route.params;

      console.log(id, userId);

      if ( query ) {
        this.$store.dispatch('fetchArticles', { query }).then(() => {
          this.items = this.$store.state.articles;
        });
      } else {
        if ( userId ) {
          this.$store.dispatch('fetchArticles', { userId }).then(() => {
            this.items = this.$store.state.articles;
          });
        } else {
          this.$store.dispatch('fetchArticles', { id }).then(() => {
            this.items = this.$store.state.articles;
          });
        }
      }
    },
    onRemoveArticle: function(id) {
      console.log(id);
      this.$store.dispatch('deleteArticle', id ).then(() => {
        this.fetchArticles();
      });
    }
  },
}
</script>
