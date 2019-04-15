<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid grid-list-md>
        <v-flex md12>
          <v-layout row wrap>
            <template v-for="item in items">
              <v-flex md4  xs12 :key="item.title">
                <router-link :to="`/articles/${item.id}`">
                  <v-card color="black" primary-title class="white--text">
                    <v-img
                      :src="item.url"
                      height="200px"
                    ></v-img>
                    <div>
                      <div class="headline" style="text-align:center">{{item.name}}</div>
                    </div>
                  </v-card>
                </router-link>
              </v-flex>
            </template>
          </v-layout>
        </v-flex>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  name: 'Categories',
  created: function() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories: function() {
      this.$store.dispatch('getCategories').then(() => {
        this.items = this.$store.state.categories;
      });
    }
  },
  data () {
    return {
      items: []
    }
  }
}
</script>