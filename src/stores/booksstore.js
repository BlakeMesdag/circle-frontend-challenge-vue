import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useBooksStore = defineStore('books', () => {
	
	const books = ref([])
	const bookstoreBaseURI = ref('http://localhost:8000')

	const cachedBooks = localStorage.getItem('books')

	if(cachedBooks) {
		books.value = JSON.parse(cachedBooks)
	}

	const fetchAllBooks = async (fn) => {
			const response = await fetch(`${bookstoreBaseURI.value}/books`)
				.then((res) => res.json())

			// eslint-disable-next-line no-debugger
			// debugger

			books.value = response.books

			if(typeof(fn) == 'function') {
				fn(books.value)
			}
		}
	const fetchBook = async (id, fn) => {
			const existing = books.value.find((b) => { return b['id'] == id })

			if(existing) {
				fn(existing)
				return
			}

			const response = await fetch(`${bookstoreBaseURI.value}/books/${id}`)
				.then((res) => res.json())

			if(typeof(fn) == 'function') {
				fn(response.book)
			}
		}
	const purchaseBook = async (id, fn) => {
			const response = await fetch(`${bookstoreBaseURI.value}/books/${id}/purchase`, {method: 'POST'})

			if(!response.ok) {
				console.log(`Purchase book failed! ${response.status}`)
				return
			}

			if(typeof(fn) == 'function') {
				const json = await response.json()

				fn(json.book)
			}
		}

	return {
		books,
		bookstoreBaseURI,
		fetchAllBooks,
		fetchBook,
		purchaseBook,
	}
})
