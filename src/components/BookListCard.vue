<template>
	<div class="container border rounded-2 position-relative">
		<div class="row p-2">
			<div class="col-12 text-bg-secondary rounded-2 mb-2">
				<img style="height: 200px" />
			</div>
		</div>

		<div class="row">
			<div class="col-12">
				<h5 class="text-truncate">
					<RouterLink :to="`/books/${book.id}`">{{book.title}}</RouterLink>
				</h5>
				<h6>{{book.author}}</h6>
			</div>
		</div>
	</div>
</template>

<script setup>
import {defineProps, computed} from 'vue'

const props = defineProps({
	'book': Object,
})

// eslint-disable-next-line no-unused-vars
const available = computed(() => {
	return props.book.availableStock > 0
})
</script>
