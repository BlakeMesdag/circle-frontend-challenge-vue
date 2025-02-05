<template>
	<Transition name="fade" mode="out-in">
		<div class="container p-3" v-if="booksStore.currentBook">
			<div class="row border rounded-2 p-2">
				<div class="col-4 text-bg-secondary rounded-2">
					<div class="card-img-top text-bg-secondary position-relative " style="height: 200px">
						<i class="bi bi-image position-absolute top-50 translate-middle" style="font-size: 4rem"></i>
					</div>
				</div>

				<div class="col-8">
					<div class="container" style="height: 100%">
						<div class="col-12 d-table" style="height: 100%;">

							<div class="d-table-cell align-middle">
								<h5 class="text-truncate">{{booksStore.currentBook.title}}</h5>
								<h6>{{booksStore.currentBook.author}}</h6>

								<button v-if="booksStore.currentBookAvailable" @click="booksStore.purchaseBook(booksStore.currentBook.id)" class="btn btn-primary shadow-sm position-relative" :disabled="booksStore.purchasing">
									<span :class="{'d-none': !booksStore.purchasing}">
										<span class="spinner-border spinner-border-sm text-light" />
										Buying
									</span>

									<span :class="{'d-none': booksStore.purchasing}">Buy Now</span>
									<span class="position-absolute top-0 start-95 translate-middle badge text-bg-danger"
									v-if="booksStore.currentBook.availableStock < 10 && booksStore.currentBook.availableStock > 0">
									{{booksStore.currentBook.availableStock + 1}} Left!
								</span>
							</button>

							<button v-else class="btn btn-danger" type="button" disabled>Sold Out</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div v-else>
		<div style="min-height: 200px; height: 200px">
			<div class="container d-table" style="height: 100%">
				<div class="d-table-cell align-middle" style="height: 100%">
					<span class="spinner-border spinner-border-lg text-secondary"></span>
				</div>
			</div>
		</div>
	</div>
</Transition>
</template>

<script setup>
	import {defineProps} from 'vue'
	import {useBooksStore} from '@/stores/BooksStore'

	defineProps({
		'id': String,
	})

	const booksStore = useBooksStore()
</script>
