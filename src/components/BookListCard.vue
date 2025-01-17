<template>
	<div class="container border rounded-2">
		<div class="row p-2">
			<div class="col-12 text-bg-secondary rounded-2 mb-2">
				<img style="height: 200px" />
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<h5 class="text-truncate">{{book.title}}</h5>
				<h6>{{book.author}}</h6>
			</div>
		</div>

		<div class="row my-2 justify-content-end align-items-center">
			<div class="col-12 align-items-start">
				<button class="btn btn-primary shadow-sm position-relative" type="button" v-if="available">
				Buy Now
					<span 
						class="position-absolute top-0 start-95 translate-middle badge text-bg-danger"
						v-if="book.availableStock < 10 && book.availableStock > 0">
							{{book.availableStock + 1}} Left!
					</span>
				</button>

				<button class="btn btn-danger" type="button" disabled v-if="!available">Sold Out</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import {defineProps, computed} from 'vue'

const props = defineProps({
	"book": Object,
})

// eslint-disable-next-line no-unused-vars
const available = computed(() => {
	return props.book.availableStock > 0
})
</script>

<script>
export default {
	computed: {
		available () {
			return (this.props.book.value.availableStock > 0)
		}
	}
}
</script>
