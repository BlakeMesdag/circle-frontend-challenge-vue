<template>
	<div class="card">
		<img class="card-img-top text-bg-secondary" style="height: 200px" />

		<div class="card-body">
			<h5 class="text-truncate">
				<RouterLink :to="`/books/${book.id}`">{{book.title}}</RouterLink>
			</h5>
			<h6>{{book.author}}</h6>
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
