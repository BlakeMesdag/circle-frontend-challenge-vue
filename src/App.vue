<template>
	<div>
		<NavBar />

		<router-view v-slot="{ Component }">
			<transition name="fade" mode="out-in">
				<component :is="Component" />
			</transition>
		</router-view>

		<div class="fixed-bottom">
			<div class="mx-2 mb-0">
				<Alerts />
			</div>
		</div>
	</div>
</template>

<script setup>
	import {defineProps} from 'vue'
	import NavBar from '@/components/NavBar.vue'
	import {AlertMessages as Alerts} from '@/components/AlertMessages.js'

	defineProps({
		name: {
			type: String,
			default: 'App',
		},
		meta: {
			transition: 'fade',
		},
	})
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>
