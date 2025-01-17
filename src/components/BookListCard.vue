<template>
	<div class="grid p-2 border rounded-2">
		<div class="col-12 text-bg-secondary rounded-2 mb-2">
			<img style="height: 200px" />
		</div>
		<div class="col-12">
			<div class="g-col-4 text-align-center">
				<p>{{title}}</p>
				<p>{{author}}</p>
			</div>
		</div>

		<div class="col-12">
			<button class="btn btn-primary" type="button" v-if="available">
				Buy Now
				<span class="badge text-bg-secondary">${{price}}</span>
			</button>
			<button class="btn btn-danger" type="button" disabled v-if="!available">Sold Out</button>
		</div>
	</div>
</template>

<script>
export default {
	props: [
		"id",
		"title",
		"isbn13",
		"author",
		"price",
		"availableStock",
	],
	computed: {
		available () {
			return this.availableStock > 0
		}
	}
}
</script>
