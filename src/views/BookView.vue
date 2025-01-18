<template>
  <div v-if="book" class="container">
    <div class="row p-2">
      <div class="col-4 text-bg-secondary rounded-2 mb-2">
        <img style="height: 200px" />
      </div>

      <div class="col-8">
        <div class="container" style="height: 100%">
          <div class="col-12" style="height: 100%; display: table">

            <div style="display: table-cell; vertical-align: middle;">
              <h5 class="text-truncate">{{book.title}}</h5>
              <h6>{{book.author}}</h6>

              <span class="btn btn-primary shadow-sm position-relative">
                Buy Now
                <span
                  class="position-absolute top-0 start-95 translate-middle badge text-bg-danger"
                  v-if="book.availableStock < 10 && book.availableStock > 0">
                    {{book.availableStock + 1}} Left!
                </span>
              </span>

              <button class="btn btn-danger" type="button" disabled v-if="!available">Sold Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, computed, ref} from 'vue'
import {useBooksStore} from '@/stores/booksstore'

const props = defineProps({
  'id': String,
})

const book = ref({})
const booksStore = useBooksStore()

// eslint-disable-next-line no-unused-vars
const available = computed(() => {
  return book.value.availableStock > 0
})

booksStore.fetchBook(props.id, (b) => { book.value = b })
</script>
