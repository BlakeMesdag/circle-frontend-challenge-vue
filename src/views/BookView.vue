<template>
        <BookListCard 
          :id="book.id"
          :isbn13="book.isbn13"
          :title="book.title"
          :price="book.price"
          :author="book.author"
          :availableStock="book.availableStock"
          :book="book" />
</template>

<script setup>
import {ref, defineProps} from 'vue'
import {useBooksStore} from '@/stores/booksstore'

const props = defineProps(['id'])

const book = ref({})
const booksStore = useBooksStore()

booksStore.fetchBook(props.id, (b) => {book.value = b})
</script>

<script>
import BookListCard from '../components/BookListCard.vue'

export default {
  components: {
    BookListCard,
  },
}
</script>
