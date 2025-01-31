export class APIError extends Error {
	constructor(message, response) {
		super(message)
		this.name = "APIError"
		this.response = response
	}
}

export class BooksAPI {
	baseURI = "http://localhost:8000"

	constructor(baseURI) {
		if(baseURI) {
			this.baseURI = baseURI
		}
	}

	async fetchAllBooks() {
		var response = null

		try {
			await this.fetchResource("/books")
		} catch(err) {
			const response = err.response
			const errClass = response ? APIError : Error
			throw new errClass(`Failed to fetch all books. Error Message: ${err.message}`, response)
		}

		const json = await response.json()
		const books = json.books

		return books ? books : null
	}

	async fetchBook(id) {
		var response = null

		try {
			response = await this.fetchResource(`/books/${id}`)
		} catch(err) {
			const response = err.response
			const errClass = response ? APIError : Error
			throw new errClass(`Failed to fetch book. Status: ${err.messsage}`, response)
		}

		const json = await response.json()

		return json.book ? json.book : null
	}

	async purchaseBook(id) {
		var response = null

		try {
			response = await this.fetchResource(`/books/${id}/purchase`, {method: "POST"})
		} catch(err) {
			const response = err.response
			const errClass = response ? APIError : Error
			throw new errClass(`Failed to purchase book. Error Message: ${err.message}`, response)
		}

		const json = await response.json()

		return json.book ? json.book : null
	}

	async fetchResource(path, options = {}) {
		const response = await fetch(`${this.baseURI}${path}`, options)

		if(response.status < 200 || response.status >= 300) {
			throw new APIError(response.text(), response)
		}

		return response
	}
}
