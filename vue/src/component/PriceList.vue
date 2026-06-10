<script setup>
const props = defineProps(['prices', 'loading']);
const emit = defineEmits(['delete']);

const handleDelete = (id) => {
  if (confirm('確定要刪除這筆珍奶紀錄嗎？')) {
    emit('delete', id);
  }
};
</script>

<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>日期</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="4">載入中...</td>
        </tr>
        <tr v-else-if="prices.length === 0">
          <td colspan="4">尚無資料</td>
        </tr>
        <tr v-for="row in prices" :key="row.id">
          <td>{{ row.date }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.price }}</td>
          <td>
            <button class="delete-btn" @click="handleDelete(row.id)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table,
th,
td {
  border: 1px solid #ccc;
}

th,
td {
  padding: 10px;
  text-align: center;
}

th {
  background-color: #eee;
}

.delete-btn {
  padding: 6px 10px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #c0392b;
}
</style>