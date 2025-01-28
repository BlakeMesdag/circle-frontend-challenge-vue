import {defineStore} from 'pinia'
import {ref, watch} from 'vue'
import {BooksAPI} from '@/api/BooksAPI'

export const useBooksStore = defineStore('books', () => {
	const books = ref([])
	const booksAPI = new BooksAPI('http://localhost:8000')

	const cachedBooks = localStorage.getItem('books')

	if(cachedBooks) {
		books.value = JSON.parse(cachedBooks)
	}

	watch(books, (newBooks) => {
		localStorage.setItem('books', JSON.stringify(newBooks))
	})

	const findExistingBook = (id) => {
		if (!books.value) {
			return null
		}

		return books.value.find((b) => { return b['id'] == id })
	}

	const fetchAllBooks = async () => {
		const response = await booksAPI.fetchAllBooks()

		books.value = response.books
	}

	const fetchBook = async (id) => {
		const existing = findExistingBook(id)

		if(existing) {
			return existing
		}

		const response = await booksAPI.fetchBook(id)

		return response.book
	}

	const purchaseBook = async (id) => {
		let response = null

		try {
			response = await booksAPI.purchaseBook(id)
		} catch(err) {
			if(err.name == "APIError") {
				response = err.response
			}

			console.log(`Purchase book failed! ${err.message}`)

			return
		}

		return response.book
	}

	return {
		books,
		fetchAllBooks,
		fetchBook,
		purchaseBook,
	}
})
