<template>
  <div class="container pt-2">
    <div class="row">
      <div class="col-md-3 px-1 pb-2" v-for="book in books" :key="book.id">
        <BookListCard 
          :id="book.id"
          :isbn13="book.isbn13"
          :title="book.title"
          :price="book.price"
          :author="book.author"
          :availableStock="book.availableStock" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const books = ref([])

const fetchBooks = async () => {
  const response = await fetch("http://localhost:8000/books")
    .then((res) => res.json() )

  books.value = response.books
}

fetchBooks()
</script>

<script>
import BookListCard from './BookListCard.vue'

export default {
  components: {
    BookListCard,
  },
}
</script>
