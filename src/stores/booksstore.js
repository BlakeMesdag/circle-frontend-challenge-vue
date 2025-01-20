import {defineStore} from 'pinia'

export const useBooksStore = defineStore('books', {
	state: () => ({
		books: [],
		bookstoreBaseURI: 'http://localhost:8000',
	}),
	actions: {
		async fetchAllBooks(books, fn) {
			const response = await fetch(`${this.bookstoreBaseURI}/books`)
				.then((res) => res.json())

			this.books = response.books

			if(typeof(fn) == 'function') {
				fn(this.books)
			}
		},
		async fetchBook(id, fn) {
			const existing = this.books.find((b) => { return b['id'] == id })

			if(existing !== null) {
				fn(existing)
			}

			const response = await fetch(`${this.bookstoreBaseURI}/books/${id}`)
				.then((res) => res.json())

			if(typeof(fn) == 'function') {
				fn(response.book)
			}
		},
		async purchaseBook(id, fn) {
			const response = await fetch(`${this.bookstoreBaseURI}/books/${id}/purchase`, {method: 'POST'})

			if(!response.ok) {
				console.log(`Purchase book failed! ${response.status}`)
				return
			}

			if(typeof(fn) == 'function') {
				const json = await response.json()

				fn(json.book)
			}
		},
	},
})
