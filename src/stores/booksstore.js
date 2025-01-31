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

	watch(books, (newBooks) => {
		localStorage.setItem('books', JSON.stringify(newBooks))
	})

	const findExistingBook = (id) => {
		if (!books.value) {
			return null
		}

		return books.value.find((b) => { return b['id'] == id })
	}

	const updateExistingBook = (book) => {
		const idx = books.value.findIndex((b) => b.id == book.id)

		books.value[idx] = book
		currentBook.value = book
	}

	const fetchAllBooks = async () => {
		const books = await booksAPI.fetchAllBooks()

		books.value = books

		return books
	}

	const fetchBook = async (id) => {
		const existing = findExistingBook(id)

		if(existing) {
			return existing
		}

		const book = await booksAPI.fetchBook(id)
		updateExistingBook(book)

		return book
	}

	const purchaseBook = async (id) => {
		const book = await booksAPI.purchaseBook(id)

		updateExistingBook(book)
		currentBook.value = book

		return book
	}

	return {
		books,
		booksAPI,
		currentBook,
		purchasing,
		fetchAllBooks,
		fetchBook,
		purchaseBook,
	}
})
