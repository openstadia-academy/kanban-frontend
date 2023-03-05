<script setup lang="ts">
import type {Ref} from "vue";
import {ref} from "vue";

const props = defineProps<{
  text: string
}>()

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

const editable: Ref<boolean> = ref(false)
const text: Ref<string> = ref('')

const input = ref(null)

const onClick = () => {
  editable.value = true
  setTimeout(() => {
    input.value?.focus()
  })
}

const onBlur = (event) => {
  editable.value = false
  const value = event.target.value
  emit('change', value)
}

</script>

<template>
  <input
      v-show="editable"
      ref="input"
      :value="text"
      @blur="onBlur"
  >

  <div v-show="!editable" @click="onClick">{{ props.text }}</div>
</template>

<style scoped>

</style>
