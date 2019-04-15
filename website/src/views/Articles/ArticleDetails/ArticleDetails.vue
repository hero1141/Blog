<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm12 md12>
            <v-card v-if="article.title">
              <v-container fluid>
                <v-layout row wrap>
                  <v-flex>
                    <v-card flat tile>
                      <v-img
                        :src="`${article.imageUrl}`"
                      ></v-img>
                    </v-card>
                    <v-card flat tile>
                      <h1 class="details-header text-md-center" style="margin-top: 2vh;">{{article.title}}</h1>
                    </v-card>
                    <v-card flat tile style="margin-top:5vh;">
                      <h4>{{ article.content }}</h4>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-container fluid>
                <v-layout row wrap>
                  <v-flex>
                    <v-card flat tile>
                      <div class="author-details">
                        <h2>About {{ article.user.firstName }} {{ article.user.lastName }}</h2>
                        <v-flex xs12 style="margin-top:15px;">
                          <v-layout row xs12 wrap>
                            <v-flex xs12 md1>
                              <img :src="article.user.avatar" alt="avatar"/>
                            </v-flex>
                            <v-flex xs12 md6>
                              {{ article.user.description  || 'Użytkownik nie dodał żadnej informacji o sobie' }}
                            </v-flex>
                            <v-flex xs12 md5>
                              <p class="right-text"> <router-link :to="{path: `/articles/user/${article.user.id}`}">Więcej artykułów od {{ article.user.firstName }} {{ article.user.lastName }}</router-link></p>
                              <div class="right-text"> <router-link :to="{path: `/wiadomosc/${article.user.id}`}">Wyślij wiadomość</router-link></div>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </div>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm12 md12>
            <v-card v-if="article.title">
              <v-container fluid>
                <v-layout row wrap>
                  <v-flex>
                    <h2>Dodaj komentarz:</h2>
                    <form>
                      <v-text-field
                        v-model="comment.content"
                        :counter="128" 
                        label="Treść"
                        data-vv-name="comment.content"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-if="!isAuthenticated"
                        v-model="comment.signature"
                        label="Podpis"
                        data-vv-name="comment.signature"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="comment.captchaAnswer"
                        label="Captcha"
                        data-vv-name="comment.captchaAnswer"
                        required
                      ></v-text-field>
                      <div>
                        <img v-bind:src="'data:image/jpeg;base64,'+article.base64" height="100px" width="300px" />
                        <v-btn icon v-on:click="fetchArticleById(id)">
                          <v-icon>refresh</v-icon>
                        </v-btn>
                      </div>
                      <v-btn @click="onCreateComment" style="margin-left:0;">Dodaj komentarz</v-btn>
                    </form>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm12 md12>
            <v-card v-if="article.title">
              <v-container fluid>
                <v-layout row wrap>
                  <v-flex>
                   <h3 style="text-align: center;">Lista komentarzy:</h3>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
            <v-card v-for="comment in article.comments" v-bind:key="comment.id">
              <v-container fluid>
                <v-layout row wrap>
                  <v-flex>
                    <v-list-tile                      
                      :key="comment.id"
                  >
                  <v-list-tile-avatar>
                    <img :src="comment.url || 'https://cdn-images-1.medium.com/max/1200/1*MccriYX-ciBniUzRKAUsAw.png'">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="comment.content"></v-list-tile-title>
                    <v-list-tile-sub-title><v-flex xs12><v-layout row xs12 wrap><v-flex xs12 md8><span class='text--primary'>{{ comment.user ? `${comment.user.firstName} ${comment.user.lastName}` : comment.signature}}</span></v-flex><v-flex xs12 md4><span class="right-text">{{ comment.createdAt | moment }} </span></v-flex></v-layout></v-flex></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                  </v-flex>
                </v-layout>
              </v-container>              
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import Vue from 'vue';
import moment from 'moment';
import 'v-toaster/dist/v-toaster.css'
Vue.use( require('v-toaster'), {timeout: 2000 });
export default {
  name: 'ArticleDetails',
  created: function() {
    const { id } = this.$route.params;
    this.fetchArticleById(id);
  },
  data () {
    return {
      id: this.$route.params.id,
      article: {},
      comment: {},
      isAuthenticated: localStorage.getItem('id')
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    }
  },
    methods: {
    fetchArticleById: function(id) {
      this.$store.dispatch('fetchArticleDetails', id).then(() => {
        this.article = this.$store.state.article;
      });
    },
    onCreateComment: function() {
      if (this.article.decoded === this.comment.captchaAnswer) {
        this.comment.article = this.$route.params.id;
        this.comment.url = localStorage.getItem('id') || null;
        this.$store.dispatch('createComment', this.comment).then(() => {
          this.comment = {};
          this.$toaster.success('Komentarz został dodany poprawnie!');
        });
      } else {
        this.$toaster.warning('Niepoprawna captcha! Spróbuj ponownie');
      }
    },
  },
}
</script>
<style>


@media only screen and (min-width: 416px) {
  .right-text {
    position: absolute;
    right: 0;
    bottom:15px;
  }
}


@media only screen and (max-width: 415px) {
  .right-text {
    position:absolute;
    padding-bottom:5px;
  }
}
.v-toaster {
  top:75px;
}


</style>