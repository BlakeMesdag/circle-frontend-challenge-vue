import {defineStore} from 'pinia'
import {ref, watch, computed} from 'vue'
import {useRoute} from 'vue-router'
import {BooksAPI} from '@/api/BooksAPI'
import {AlertMessages as Alerts} from '@/components/AlertMessages.js'

export const useBooksStore = defineStore('books', () => {
	const route = useRoute()
	const baseURI = ref("https://sky-high-books-backend-604a7039b5db.herokuapp.com")
	const books = ref([])
	const booksAPI = new BooksAPI(baseURI.value)
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

	const storePurchasedBooks = (newPurchasedBooks) => {
		localStorage.setItem('purchasedBooks', JSON.stringify(newPurchasedBooks.value))
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
		var books = null

		try {
			books = await booksAPI.fetchAllBooks()
		} catch(err) {
			Alerts.error(`Couldn't fetch books: ${err.message}`)
			return []
		}

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

	const setupStore = () => {
		if(localStorage.getItem('books')) {
			books.value = JSON.parse(localStorage.getItem('books'))
		} else {
			fetchAllBooks().then((newBooks) => {books.value = newBooks})
		}

		if(route.params.id) {
			getCachedOrFetchBook(route.params.id).then((book) => currentBook.value = book)
		}

		if(localStorage.getItem('purchasedBooks')) {
			purchasedBooks.value = JSON.parse(localStorage.getItem('purchasedBooks'))
		}

		if(localStorage.getItem('bookstoreURI')) {
			baseURI.value = localStorage.getItem('bookstoreURI')
			booksAPI.setBaseURI(baseURI.value)
		}
	}

	const setupWatchers = () => {
		watch(books, cacheBooks)

		watch(() => route.params.id, async (newId) => {
			if(!newId) { return }

			currentBook.value = await getCachedOrFetchBook(newId)
		})

		watch(() => purchasedBooks, storePurchasedBooks, {deep: true})

		watch(baseURI, (newBaseURI) => {
			localStorage.setItem('bookstoreURI', newBaseURI)
			booksAPI.setBaseURI(newBaseURI)
		})
	}

	setupStore()
	setupWatchers()

	return {
		baseURI,
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
		setupStore,
		setupWatchers,
		storeBook,
		storePurchasedBooks,
	}
})
