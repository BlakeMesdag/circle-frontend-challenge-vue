<template>
	<div>
		<TransitionGroup name="fade" mode="out-in" tag="div">
			<div v-for="alert in alerts" :key="alert.id">
				<div :class="['alert', 'mb-2', alert.alertClass]">{{alert.message}}</div>
			</div>
		</TransitionGroup>
	</div>
</template>

<script>
	import {ref} from 'vue'

	const alerts = ref([])

	function uuidv4() {
		return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
			(+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
			);
	}

	class Alert {
		constructor(message, level, duration) {
			this.message = message
			this.level = level
			this.duration = duration
			this.showing = false
			this.alertClass = `alert-${level}`

			this.duration ||= 5000

			this.id = uuidv4()
		}

		show() {
			alerts.value.push(this)
			this.showing = true

			setTimeout(() => { this.hide() }, this.duration)
		}

		hide() {
			if(!this.showing) { return }
			alerts.value = alerts.value.filter((alert) => alert.id !== this.id)
			this.showing = false
		}
	}

	const alert = (message, level) => {
		let alert = new Alert(message, level)
		alert.show()
	}

	const success = (message) => {
		alert(message, "success")
	}

	const error = (message) => {
		alert(message, "danger")
	}

	const info = (message) => {
		alert(message, "info")
	}

	export default {
		success,
		error,
		info,
		data() {
			return { alerts }
		},
	}
</script>
