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

	setBaseURI(newBaseURI) {
		this.baseURI = newBaseURI
	}

	async fetchAllBooks() {
		var response = null

		try {
			response = await this.fetchResource("/books")
		} catch(err) {
			let errResponse = err.response
			let errClass = errResponse ? APIError : Error
			throw new errClass(err.message, errResponse)
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
			let errResponse = err.response
			let errClass = errResponse ? APIError : Error
			throw new errClass(err.message, response)
		}

		const json = await response.json()

		return json.book ? json.book : null
	}

	async purchaseBook(id) {
		var response = null

		try {
			response = await this.fetchResource(`/books/${id}/purchase`, {method: "POST"})
		} catch(err) {
			let errResponse = err.response
			let errClass = errResponse ? APIError : Error
			throw new errClass(err.message, errResponse)
		}

		const json = await response.json()

		return json.book ? json.book : null
	}

	async fetchResource(path, options = {}) {
		const response = await fetch(`${this.baseURI}${path}`, options)

		if(response.status < 200 || response.status >= 300) {
			const json = await response.json()
			throw new APIError(json.message, response)
		}

		return response
	}
}
