<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <label>
    <input type="number" name="income-amount" />
  </label>
  <input type="submit" />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
