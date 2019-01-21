import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import axios from 'axios'
import VueCookies from 'vue-cookies'

import store from './store'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'login',
            components: {
                default: Login,
                'header': () => import('./components/HeaderLogin.vue'),
                'footer': () => import('./components/FooterLogin.vue')
            },
            beforeEnter(to, from, next) {
                const token = $cookies.get("token")
                if (!token) {
                    next()
                    return
                }
                axios.get('/check-token',{
                    'headers': {
                        'Authorization': token
                    }
                })
                .then(res =>{
                    next('/dashboard')
                })
                .catch(error => {
                    next()
                })
            }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            components: {
                default: () => import('./views/Dashboard.vue'),
                'header': () => import('./components/Header.vue'),
                'footer': () => import('./components/FooterLogin.vue')
            },
            beforeEnter(to, from, next) {
                const token = $cookies.get("token")
                if (!token) {
                    next('/')
                    return
                }
                axios.get('/check-token',{
                    'headers': {
                        'Authorization': token
                    }
                })
                .then(res => {
                    next()
                })
                .catch(error => {
                    next('/')
                })

                // console.log(store.getters.isAuthenticated);
                // if (store.getters.isAuthenticated) {
                //     next()
                // }
                // else {
                //     next('/')
                // }
            }
        }
    ]
})
