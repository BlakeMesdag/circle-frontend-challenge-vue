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
import {ref,watch} from 'vue'
import {useRoute} from 'vue-router'

const route = useRoute()

const book = ref({})

const fetchBook = async (id) => {
  const response = await fetch("http://localhost:8000/books/" + id)
    .then((res) => res.json() )

  book.value = response.book
}

watch(() => route.params.id, fetchBook, {immediate: true})
</script>

<script>
import BookListCard from '../components/BookListCard.vue'

export default {
  components: {
    BookListCard,
  },
}
</script>
