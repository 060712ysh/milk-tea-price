<script setup>
import { ref, onMounted } from 'vue';
import PriceForm from './component/PriceForm.vue';
import PriceList from './component/PriceList.vue';
import PriceSearch from './component/PriceSearch.vue';
import PriceRecordCount from './component/PriceRecordCount.vue';

const prices = ref([]);
const loading = ref(false);
const searchKeyword = ref('');

const fetchPrices = async (keyword = '') => {
  loading.value = true;
  let url = '/api/prices';
  if (keyword.trim()) {
    url += '?q=' + encodeURIComponent(keyword.trim());
  }

  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('Fetch failed');
    const data = await resp.json();
    
    // Sort by date descending
    prices.value = data.sort((a, b) => {
      if (a.date === b.date) return 0;
      return a.date < b.date ? 1 : -1;
    });
  } catch (err) {
    console.error(err);
    alert('無法載入資料');
  } finally {
    loading.value = false;
  }
};

const addPrice = async (payload) => {
  try {
    const resp = await fetch('/api/prices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!resp.ok) {
      const err = await resp.json();
      throw new Error(err.error || 'Add failed');
    }
    await fetchPrices(searchKeyword.value);
  } catch (err) {
    alert('新增失敗: ' + err.message);
  }
};

const deletePrice = async (id) => {
  try {
    const resp = await fetch(`/api/prices/${id}`, {
      method: 'DELETE',
    });
    if (!resp.ok) throw new Error('Delete failed');
    await fetchPrices(searchKeyword.value);
  } catch (err) {
    alert('刪除失敗: ' + err.message);
  }
};

const handleSearch = (keyword) => {
  searchKeyword.value = keyword;
  fetchPrices(keyword);
};

onMounted(() => {
  fetchPrices();
});
</script>

<template>
  <div class="container">
    <h1>珍奶價格觀察站</h1>
    
    <PriceForm @add="addPrice" />
    
    <hr>
    
    <PriceSearch @search="handleSearch" />
    
    <hr>
    
    <PriceRecordCount :count="prices.length" />
    
    <PriceList 
      :prices="prices" 
      :loading="loading" 
      @delete="deletePrice" 
    />
  </div>
</template>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  margin: 0;
  padding: 30px;
}

@media (max-width: 640px) {
  body {
    padding: 16px;
  }
}
</style>

<style scoped>
.container {
  width: 800px;
  max-width: 100%;
  margin: auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-top: 0;
}

hr {
  border: 0;
  border-top: 1px solid #eee;
  margin: 20px 0;
}

@media (max-width: 640px) {
  .container {
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    border-radius: 0;
  }
}
</style>
