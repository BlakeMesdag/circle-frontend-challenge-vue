<template>
  <div class="container pt-2">
    <div class="row">
      <div class="col-md-3 px-1 pb-2" v-for="book in store.books" :key="book.id">
        <BookListCard 
          :id="book.id"
          :isbn13="book.isbn13"
          :title="book.title"
          :price="book.price"
          :author="book.author"
          :availableStock="book.availableStock"
          :book="book" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useBooksStore} from '@/stores/booksstore'

const books = ref([])
const store = useBooksStore()

store.fetchAllBooks(books)
</script>

<script>
import BookListCard from '../components/BookListCard.vue'

export default {
  components: {
    BookListCard,
  },
}
</script>
