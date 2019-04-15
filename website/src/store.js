import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const BASE_URL = 'http://localhost:3000';

const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  UPDATE_PROFILE: 'UPDATE_PROFILE',
  GET_PROFILE: 'GET_PROFILE',
  GET_CATEGORIES: 'GET_CATEGORIES',
  FETCH_ARTICLES: 'FETCH_ARTICLES',
  SAVE_ARTICLE: 'SAVE_ARTICLE',
  FETCH_ARTICLE_DETAILS: 'FETCH_ARTICLE_DETAILS',
  CREATE_COMMENT: 'CREATE_COMMENT',
  SEND_MESSAGE: 'SEND_MESSAGE',
  REMOVE_ARTICLE: 'REMOVE_ARTICLE',
};

export default new Vuex.Store({
  state: {
    logged: localStorage.getItem('token'),
    categories: [],
    profile: {},
    articles: [],
    article: {},
    comment: {},
    comments: [],
  },
  getters: {
    isLogged: state => state.logged,
    categories: state => state.categories,
  },
  mutations: {
    [types.SEND_MESSAGE]: (state, payload) => {
      
    },
    [types.REMOVE_ARTICLE]: (state, payload) => {
      Vue.set(state, 'articles', payload);
    },
    [types.CREATE_COMMENT]: (state, payload) => {
      state.article.comments.unshift(payload);
    },
    [types.FETCH_ARTICLE_DETAILS]: (state, payload) => {
      Vue.set(state, 'article', payload);
    },
    [types.SAVE_ARTICLE]: (state, payload) => {
      state.articles.unshift(payload);
    },
    [types.FETCH_ARTICLES]: (state, payload) => {
      Vue.set(state, 'articles', payload);
    },
    [types.GET_CATEGORIES]: (state, payload) => {
      Vue.set(state, 'categories', payload);
    },
    [types.GET_PROFILE]: (state, payload) => {
      Vue.set(state, 'profile', payload);
    },
    [types.UPDATE_PROFILE]: (state, payload) => {
      Vue.set(state, 'profile', payload);
    },
    [types.LOGIN]: (state) => {
      Vue.set(state, 'logged', 1);
    },
    [types.LOGOUT]: (state) => {
      Vue.set(state, 'logged', 0);
    },
    [types.GET_CATEGORIES]: (state, categories) => {
      state.categories = categories;
    }
  },
  actions: {
    login: ({ commit }, credentials) => {
      return new Promise((resolve, reject) => {
        Vue.http.post(`${BASE_URL}/auth/login`,  {
          ...credentials
        }).then((res) => {
          console.log(res);
          if (res.status === 200) {
            localStorage.setItem('token', res.body.token);
            localStorage.setItem('id', res.body.id);
            commit(types.LOGIN);
            resolve();
          }
          else {
            resolve();
          }
        }).catch((err) => {
          reject(err);
        });
      });
     
    },
    logout: ({ commit }) => {
      localStorage.removeItem('token');
      commit(types.LOGOUT);
    },
    updateProfile: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        Vue.http.put(`${BASE_URL}/users/${data.id}`, data.profile).then((response) => {
          commit(types.UPDATE_PROFILE, response.body);
          return resolve();
        }).catch((err) => {
          return reject(err);
        });
      });
    },
    getProfile: ({ commit }, id) => {
      return new Promise((resolve, reject) => {
        Vue.http.get(`${BASE_URL}/users/${id}`).then((res) => {
          commit(types.GET_PROFILE, res.body);
          resolve();
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getCategories: ({ commit }) => {
      return new Promise((resolve, reject) => {
        Vue.http.get(`${BASE_URL}/categories/`).then((res) => {
          commit(types.GET_CATEGORIES, res.body);
          resolve();
        }).catch((err) => {
          reject(err);
        });
      });
    },
    fetchArticles: ({ commit }, params) => {
      return new Promise((resolve, reject) => {
        let url = '';
        if ( params.id ) {
          url = `${BASE_URL}/articles?category=${params.id}`;
        } else {
          if (params.query) {
            url = `${BASE_URL}/articles?query=${params.query}`;
          } else {
            if ( params.userId ) {
              url = `${BASE_URL}/articles?user=${params.userId}`;
            } else {
              url = `${BASE_URL}/articles`;
            }          
          }
        }
        Vue.http.get(url).then((res) => {
          commit(types.FETCH_ARTICLES, res.body);
          resolve();
        }).catch((err) => {
          reject(err);
        });
      });
    },
    saveArticle: ({ commit }, data ) => {
      return new Promise((resolve, reject) => {
        Vue.http.post(`${BASE_URL}/articles`, data).then((res) => {
          commit(types.SAVE_ARTICLE, res.body);
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    fetchArticleDetails: ({ commit }, id) => {
      return new Promise((resolve, reject) => {
        Vue.http.get(`${BASE_URL}/articles/${id}`).then((res) => {
          commit(types.FETCH_ARTICLE_DETAILS, res.body);
          return resolve(res);
        }).catch((err) => {
          return reject(err);
        });
      });
    },
    createComment: ({ commit }, comment) => {
      return new Promise((resolve, reject) => {
        Vue.http.post(`${BASE_URL}/comments`, comment).then((res) => {
          commit(types.CREATE_COMMENT, res.body);
          return resolve(res);
        }).catch((err) => {
          return reject(err);
        });
      });
    },
    sendMessage: ({ commit }, message) => {
      return new Promise(( resolve, reject) => {
        Vue.http.post(`${BASE_URL}/users/message`, message).then((res) => {
          commit(types.SEND_MESSAGE, res.body);
          return resolve(res);
        }).catch((err) => {
          console.log(err);
          return reject(err);
        });
      })
    },
    deleteArticle: ({ commit }, id) => {
      return new Promise(( resolve, reject) => {
        Vue.http.delete(`${BASE_URL}/articles/${id}`).then((res) => {
          commit(types.REMOVE_ARTICLE, res.body);
          return resolve(res);
        }).catch((err) => {
          console.log(err);
          return reject(err);
        });
      })
    }
  }
});
