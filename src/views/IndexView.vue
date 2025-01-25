<template>
  <div class="row row-cols-3 row-cols-md-3 g-4 m-1">
    <div class="col" v-for="book in store.books" :key="book.id">
      <BookListCard :book="book" />
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useBooksStore} from '@/stores/BooksStore'

const books = ref([])
const store = useBooksStore()

store.fetchAllBooks(books)
</script>

<script>
import BookListCard from '@/components/BookListCard.vue'

export default {
  components: {
    BookListCard,
  },
}
</script>
