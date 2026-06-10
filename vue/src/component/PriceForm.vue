<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['add']);

const year = ref('');
const month = ref('');
const day = ref('');
const product = ref('');
const price = ref('');

const yearInput = ref(null);
const monthInput = ref(null);
const dayInput = ref(null);

const onlyDigits = (val) => String(val || '').replace(/\D/g, '');

const focusAndSelect = (el) => {
  if (!el) return;
  el.focus();
  el.select();
};

const handleYearInput = () => {
  year.value = onlyDigits(year.value).slice(0, 4);
  if (year.value.length >= 4) {
    focusAndSelect(monthInput.value);
  }
};

const handleMonthInput = () => {
  month.value = onlyDigits(month.value).slice(0, 2);
  if (month.value.length >= 2) {
    focusAndSelect(dayInput.value);
  }
};

const handleDayInput = () => {
  day.value = onlyDigits(day.value).slice(0, 2);
};

const handleKeydown = (ev, current, next, prev) => {
  if (ev.key === 'Backspace' && current.value.length === 0 && prev) {
    ev.preventDefault();
    focusAndSelect(prev);
  }
  if (ev.key === 'Enter' && current.value.length >= (current === year ? 4 : 2) && next) {
    ev.preventDefault();
    focusAndSelect(next);
  }
};

const submitForm = () => {
  const y = onlyDigits(year.value).padStart(4, '0');
  const m = onlyDigits(month.value).padStart(2, '0');
  const d = onlyDigits(day.value).padStart(2, '0');
  const dateStr = `${y}-${m}-${d}`;
  const nameStr = product.value ? product.value.trim() : '';
  const priceVal = price.value;

  if (y.length !== 4 || m.length !== 2 || d.length !== 2 || !nameStr || priceVal === '' || priceVal === null) {
    alert('請填寫日期、商品名稱與價格');
    return;
  }

  emit('add', {
    date: dateStr,
    name: nameStr,
    price: Number(priceVal)
  });

  // Reset
  year.value = '';
  month.value = '';
  day.value = '';
  product.value = '';
  price.value = '';
  focusAndSelect(yearInput.value);
};
</script>

<template>
  <div class="form-box">
    <div class="form-row">
      <label>日期：</label>
      <div class="date-group">
        <input
          ref="yearInput"
          v-model="year"
          type="text"
          inputmode="numeric"
          maxlength="4"
          placeholder="YYYY"
          @input="handleYearInput"
          @keydown="handleKeydown($event, year, monthInput, null)"
        >
        <span class="date-separator">-</span>
        <input
          ref="monthInput"
          v-model="month"
          type="text"
          inputmode="numeric"
          maxlength="2"
          placeholder="MM"
          @input="handleMonthInput"
          @keydown="handleKeydown($event, month, dayInput, yearInput)"
        >
        <span class="date-separator">-</span>
        <input
          ref="dayInput"
          v-model="day"
          type="text"
          inputmode="numeric"
          maxlength="2"
          placeholder="DD"
          @input="handleDayInput"
          @keydown="handleKeydown($event, day, null, monthInput)"
        >
      </div>
    </div>

    <div class="form-row">
      <label>商品名稱：</label>
      <input v-model="product" type="text" placeholder="例如：珍珠奶茶">
    </div>

    <div class="form-row price-row">
      <label>價格：</label>
      <input v-model="price" type="number" placeholder="例如：65">
    </div>

    <button type="button" @click="submitForm">新增資料</button>
  </div>
</template>

<style scoped>
.form-box {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.form-row label {
  min-width: 90px;
  font-weight: 600;
  color: #333;
}

.date-group {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.date-group input {
  width: 72px;
  text-align: center;
}

.date-group input:first-child {
  width: 96px;
}

.form-row input[type="text"],
.form-row input[type="number"] {
  flex: 1 1 220px;
  max-width: 320px;
  margin: 0;
}

.price-row input {
  max-width: 180px;
}

.date-separator {
  color: #666;
  font-weight: bold;
  user-select: none;
}

input {
  padding: 8px;
  margin: 5px;
  box-sizing: border-box;
}

button {
  align-self: flex-start;
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

@media (max-width: 640px) {
  .form-row {
    align-items: flex-start;
  }
  .form-row label {
    min-width: 0;
  }
  .form-row input[type="text"],
  .form-row input[type="number"],
  .price-row input {
    width: 100%;
    max-width: none;
    flex: 1 1 100%;
  }
  .date-group {
    width: 100%;
  }
  .date-group input {
    flex: 1 1 0;
    min-width: 64px;
  }
  button {
    width: 100%;
  }
}
</style>