import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Authentication/Login';
import Categories from './views/Categories/Categories';
import About from './views/About';
import Articles from './views/Articles/Articles';
import Profile from './views/Profile/Profile';
import ArticleDetails from './views/Articles/ArticleDetails/ArticleDetails';
import Rules from './views/Static/Rules/Rules';
import FAQ from './views/Static/FAQ/FAQ';
import Message from './views/Static/Message/Message';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/article/:id',
      name: 'articleDetails',
      component: ArticleDetails
    },
    {
      path: '/zasady',
      name: 'zasady',
      component: Rules
    },
    {
      path: '/wiadomosc/:id',
      name: 'wiadomosc',
      component: Message
    },
    {
      path: '/faq',
      name: 'faq',
      component: FAQ,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About
    },
    {
      path: '/blog-admin',
      name: 'blog-admin',
      component: Login,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/articles',
      name: 'articles',
      component: Articles
    },
    {
      path: '/articles/user/:userId',
      name: 'articlesByUser',
      component: Articles
    },
    {
      path: '/articles/:id',
      name: 'categoryArticles',
      component: Articles
    },
    {
      path: '/categories',
      name: 'categories',
      component: Categories,
    },
    {
      path: '/',
      name: 'home',
      component: Articles,
    },
  ]
})
