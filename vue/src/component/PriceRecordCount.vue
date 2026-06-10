<script setup>
defineProps(['count']);
</script>

<template>
  <div class="record-count">
    目前共有 {{ count }} 筆珍奶價格紀錄
  </div>
</template>

<style scoped>
.record-count {
  margin: 12px 0;
  font-weight: 600;
  color: #333;
}
</style>