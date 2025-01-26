<template>
  <div class="container">
    <div class="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 g-3 m-1">
      <div class="col" v-for="book in store.books" :key="book.id">
        <BookListCard :book="book" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {useBooksStore} from '@/stores/BooksStore'

const store = useBooksStore()

store.fetchAllBooks()
</script>

<script>
import BookListCard from '@/components/BookListCard.vue'

export default {
  components: {
    BookListCard,
  },
}
</script>
