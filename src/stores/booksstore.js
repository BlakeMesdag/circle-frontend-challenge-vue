import {defineStore} from 'pinia'

export const useBooksStore = defineStore('books', {
	state: () => ({books: []}),
	actions: {
		async fetchAllBooks(books, fn) {
			const response = await fetch('http://localhost:8000/books')
				.then((res) => res.json())

			this.books = response.books

			if(typeof(fn) == 'function') {
				fn(this.books)
			}
		},
		async fetchBook(id, fn) {
			const response = await fetch('http://localhost:8000/books/' + id)
				.then((res) => res.json())

			if(typeof(fn) == 'function') {
				fn(response.book)
			}
		},
	},
})
