<template>
	<div class="card">
		<div class="card-img-top text-bg-secondary position-relative " style="height: 200px">
			<i class="bi bi-image position-absolute top-50 translate-middle" style="font-size: 4rem"></i>
		</div>

		<div class="card-body">
			<h5 class="text-truncate">
				<RouterLink :to="`/books/${book.id}`">{{book.title}}</RouterLink>
			</h5>
			<h6>{{book.author}}</h6>
		</div>
	</div>
</template>

<script setup>
	import {defineProps} from 'vue'

	defineProps({
		'book': Object,
	})
</script>
