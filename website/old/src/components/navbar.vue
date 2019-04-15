<template>
    <v-toolbar app >
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">BLOG</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="user"
        @click="logout"
      >
        <span class="mr-2">Logout</span>
      </v-btn>
    </v-toolbar>
</template>

<script>

export default {
  name: 'Navbar',
  components: {
  },
  props: [
    'user',
    'logout'
  ],
  data () {
    return {

    };
  },
  methods: {
  }
}
</script>
