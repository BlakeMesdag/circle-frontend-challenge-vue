import {defineStore} from 'pinia'
import {ref, watch} from 'vue'
import {BooksAPI} from '@/api/BooksAPI'

export const useBooksStore = defineStore('books', () => {
	const books = ref([])
	const booksAPI = new BooksAPI('http://localhost:8000')
	const currentBook = ref(null)
	const purchasing = ref(false)

	if(localStorage.getItem('books')) {
		books.value = JSON.parse(localStorage.getItem('books'))
	}

	const storeBook = (book) => {
		const idx = books.value.findIndex((b) => b.id == book.id) || books.length()

		books.value[idx] = book
		currentBook.value = book

		cacheBooks(books.value)
	}

	const cacheBooks = (newBooks) => {
		localStorage.setItem('books', JSON.stringify(newBooks))
	}
	watch(books, cacheBooks)

	const findExistingBook = (id) => {
		if (!books.value) {
			return null
		}

		return books.value.find((b) => { return b['id'] == id })
	}

	const getCachedOrFetchAllBooks = async () => {
		return books.value || fetchAllBooks()
	}

	const fetchAllBooks = async () => {
		const books = await booksAPI.fetchAllBooks()

		books.value = books

		return books
	}

	const fetchBook = async (id) => {
		const book = await booksAPI.fetchBook(id)
		storeBook(book)

		return book
	}

	const getCachedOrFetchBook = async (id) => {
		const existing = findExistingBook(id)

		if(existing) {
			return existing
		}

		return fetchBook(id)
	}

	const purchaseBook = async (id) => {
		const book = await booksAPI.purchaseBook(id)

		storeBook(book)
		currentBook.value = book

		return book
	}

	return {
		books,
		booksAPI,
		currentBook,
		purchasing,
		cacheBooks,
		fetchAllBooks,
		fetchBook,
		purchaseBook,
		findExistingBook,
		getCachedOrFetchBook,
		getCachedOrFetchAllBooks,
		storeBook,
	}
})
