import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

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
		children: [
			{
				path: '',
				component: BookView,
			},
		]
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

createApp(App)
	.use(router)
	.mount('#app')
