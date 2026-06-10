<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['search']);
const searchQuery = ref('');

watch(searchQuery, (newVal) => {
  emit('search', newVal);
});
</script>

<template>
  <div class="search-box">
    <label>搜尋商品：</label>
    <input v-model="searchQuery" type="text" placeholder="輸入商品名稱">
  </div>
</template>

<style scoped>
.search-box {
  margin-bottom: 20px;
}

.search-box label {
  font-weight: 600;
  color: #333;
  margin-right: 12px;
}

input {
  padding: 8px;
  max-width: 320px;
  width: 100%;
}
</style>