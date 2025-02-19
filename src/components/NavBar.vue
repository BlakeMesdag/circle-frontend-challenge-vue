<template>
	<div id="navbar">
		<nav class="navbar bg-body-tertiary fixed-top">
			<div class="container-fluid">
				<a class="navbar-brand">Sky High Books</a>

				<form class="d-flex">
					<label class="form-label" for="bookStoreBaseURI">Bookstore API Base URI</label>
					<input class="form-control" id="bookStoreBaseURI" v-model="booksStore.baseURI" />
				</form>
			</div>
		</nav>
	</div>
</template>

<script setup>
	import {useBooksStore} from '@/stores/BooksStore'

	const booksStore = useBooksStore()
</script>
