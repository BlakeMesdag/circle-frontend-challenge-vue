import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import {createWebHistory, createRouter} from 'vue-router'

import App from './App.vue'

import IndexView from './views/IndexView.vue'
import BookView from './views/BookView.vue'

const routes = [
	{
		path: '/',
		component: App,
		children: [
			{
				path: '',
				component: IndexView,
			},
		]
	},
	{
		path: '/books/:id',
		component: App,
		props: true,
		children: [
			{
				path: '',
				component: BookView,
				props: true,
			},
		]
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

const pinia = createPinia()

createApp(App)
	.use(router)
	.use(pinia)
	.mount('#app')
