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
		await this.fetchResource("/books")
	}

	async fetchBook(id) {
		await this.fetchResource(`/books/${id}`)
	}

	async purchaseBook(id) {
		await this.fetchResource(`/books/${id}/purchase`, {method: "POST"})
	}

	async fetchResource(path, options = {}) {
		const response = await fetch(`${this.baseURI}${path}`, options)

		if(response.status < 200 || response.status >= 300) {
			throw new APIError(response.text(), response)
		}

		const json = await response.json()
		return json
	}
}
