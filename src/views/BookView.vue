<template>
<Transition name="fade" mode="out-in">
  <div class="container border rounded-2" v-if="book.title">
    <div class="row p-2">
      <div class="col-4 text-bg-secondary rounded-2">
        <img style="min-height: 200px; height: 200px" />
      </div>

      <div class="col-8">
        <div class="container" style="height: 100%">
          <div class="col-12 d-table" style="height: 100%;">

            <div class="d-table-cell align-middle">
              <h5 class="text-truncate">{{book.title}}</h5>
              <h6>{{book.author}}</h6>

              <button @click="purchaseBook" v-if="available" class="btn btn-primary shadow-sm position-relative" :disabled="purchasing">
                <span :class="{'d-none': !purchasing}">
                  <span class="spinner-border spinner-border-sm text-light" />
                  Buying
                </span>

                <span :class="{'d-none': purchasing}">Buy Now</span>
                <span class="position-absolute top-0 start-95 translate-middle badge text-bg-danger"
                      v-if="book.availableStock < 10 && book.availableStock > 0">
                    {{book.availableStock + 1}} Left!
                </span>
              </button>

              <button class="btn btn-danger" type="button" disabled v-if="!available">Sold Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <div style="min-height: 200px; height: 200px">
      <div class="container d-table" style="height: 100%">
        <div class="d-table-cell align-middle" style="height: 100%">
          <span class="spinner-border spinner-border-lg text-secondary"></span>
        </div>
      </div>
    </div>
  </div>
</Transition>
</template>

<script setup>
import {defineProps, computed, ref} from 'vue'
import {useBooksStore} from '@/stores/BooksStore'

const props = defineProps({
  'id': String,
  'book': {
    'type': Object,
    'default': {},
  },
  'purchasing': Boolean,
})

const book = ref({})
const booksStore = useBooksStore()
const purchasing = ref(false)

// eslint-disable-next-line no-unused-vars
const available = computed(() => {
  return book.value.availableStock > 0
})

const purchaseBook = () => {
  if(purchasing.value) { return }

  purchasing.value = true

  booksStore.purchaseBook(book.value.id, (b) => {
    book.value = b
  })

  setTimeout(() => {
    purchasing.value = false
  }, 500)
}

booksStore.fetchBook(props.id, (b) => { book.value = b })
</script>
