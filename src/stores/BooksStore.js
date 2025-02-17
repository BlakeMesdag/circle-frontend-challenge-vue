import {defineStore} from 'pinia'
import {ref, watch, computed} from 'vue'
import {useRoute} from 'vue-router'
import {BooksAPI} from '@/api/BooksAPI'
import {AlertMessages as Alerts} from '@/components/AlertMessages.js'

export const useBooksStore = defineStore('books', () => {
	const route = useRoute()
	const books = ref([])
	const booksAPI = new BooksAPI('http://localhost:8000')
	const purchasedBooks = ref({})
	const currentBook = ref({})
	const purchasing = ref(false)

	const storeBook = (book) => {
		//eslint-disable-next-line vue/no-ref-as-operand
		var idx = books.value.findIndex((b) => b.id == book.id)

		if(books.value.length > 0) {
			books.value[idx] = book
		}
		currentBook.value = book

		cacheBooks(books.value)
	}

	const cacheBooks = (newBooks) => {
		if(newBooks.length > 0) {
			localStorage.setItem('books', JSON.stringify(newBooks))
		}
	}

	const findExistingBook = (id) => {
		if (!books.value) {
			return null
		}

		return books.value.find((b) => { return b['id'] == id })
	}

	const getCachedOrFetchAllBooks = async () => {
		if(books.value.length > 0) {
			return books
		} else {
			return fetchAllBooks()
		}
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
		purchasing.value = true

		var book = null
		try {
			book = await booksAPI.purchaseBook(id)
		} catch(err) {
			Alerts.error(`Couldn't purchase book, please try again. ${err.message}`)
		}

		if(book) {
			purchasedBooks.value[book.id] ||= {'title': book.title, quantity: 0}
			purchasedBooks.value[book.id]['quantity'] += 1

			storeBook(book)
			currentBook.value = book

			Alerts.success(`Purchased a copy of ${book.title}!`)
		}

		setTimeout(() => {purchasing.value = false}, 500)

		return book
	}

	const currentBookAvailable = computed(() => {
		return currentBook.value.availableStock > 0
	})

	if(localStorage.getItem('books')) {
		books.value = JSON.parse(localStorage.getItem('books'))
	} else {
		fetchAllBooks().then((newBooks) => {books.value = newBooks})
	}
	watch(books, cacheBooks)

	if(route.params.id) {
		getCachedOrFetchBook(route.params.id).then((book) => currentBook.value = book)
	}

	watch(() => route.params.id, async (newId) => {
		if(!newId) { return }

		currentBook.value = await getCachedOrFetchBook(newId)
	})

	return {
		books,
		booksAPI,
		currentBook,
		purchasedBooks,
		purchasing,
		route,
		cacheBooks,
		currentBookAvailable,
		fetchAllBooks,
		fetchBook,
		purchaseBook,
		findExistingBook,
		getCachedOrFetchBook,
		getCachedOrFetchAllBooks,
		storeBook,
	}
})
