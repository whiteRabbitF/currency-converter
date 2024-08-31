<template>
  <div class="currency-converter">
    <p class="has">у меня есть:</p>
    <div class="converter-section">
      <CurrencyDropdown v-model="fromCurrency" class="currency-dropdown" />
      <input
          type="number"
          v-model.number="fromValue"
          @input="convertCurrency('from')"
          class="currency-input"
          placeholder="Введите сумму"
      />
    </div>
    <p class="has">хочу приобрести:</p>
    <div class="converter-section">
      <CurrencyDropdown v-model="toCurrency" class="currency-dropdown" />
      <input
          type="number"
          v-model.number="toValue"
          @input="convertCurrency('to')"
          class="currency-input"
          placeholder="Введите валюту"
          disabled
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useCurrencyStore } from '../store/currency.ts';
import CurrencyDropdown from '../components/CurrencyDropdown.vue';

const store = useCurrencyStore();

const fromCurrency = ref('RUB');
const toCurrency = ref('USD');
const fromValue = ref(null);
const toValue = ref(null);
//const isConverting = ref(false);

const getRate = () => {
  const rate = store.getRate(fromCurrency.value, toCurrency.value);
  console.log(`Получаем курс для ${fromCurrency.value} -> ${toCurrency.value}: ${rate}`);
  return rate;
};
const currencyRates = ref<Record<string, number>>({});

const convertCurrency = (direction: 'from' | 'to') => {
  if (!currencyRates.value || Object.keys(currencyRates.value).length === 0) {
    console.error('Курсы валют еще не загружены');
    return;
  }

  const rate = getRate();

  if (rate !== undefined && !isNaN(rate)) {
    if (direction === 'from') {
      toValue.value = parseFloat((fromValue.value * rate).toFixed(2)) || 0;
    } else {
      fromValue.value = parseFloat((toValue.value / rate).toFixed(2)) || 0;
    }
  } else {
    console.error(`Курс обмена для ${fromCurrency.value} -> ${toCurrency.value} не найден или невалидный`);
    if (direction === 'from') {
      toValue.value = 0;
    } else {
      fromValue.value = 0;
    }
  }
};

watchEffect(() => {
  const rate = getRate();
  if (rate && !isNaN(rate)) {
    toValue.value = parseFloat((fromValue.value * rate).toFixed(2)) || 0;
  }
});
</script>

<style scoped lang="scss">
.currency-converter {
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: 500px;
  margin: 0 auto;
  padding: 25px;
  background: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  color: #e0e0e0;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  & .has {
    display: flex;
    justify-content: right;
    color: #00aaff;
    font-weight: 600;
  }
}

.converter-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.currency-dropdown {
  flex: 1;
  min-width: 200px;
  min-height: 66px;
  background: #2c2c2c;
  color: #e0e0e0;
  border: 1px solid #444;
  border-radius: 15px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.currency-input {
  flex: 2;
  padding: 10px;
  font-size: 20px;
  font-weight: 600;
  background-color: #2c2c2c;
  border: 1px solid #444;
  border-radius: 15px;
  color: #e0e0e0;
  box-sizing: border-box;
  transition: border-color 0.3s ease, background-color 0.3s ease;
  height: 66px;
}

.currency-input::placeholder {
  color: #888;
}

.currency-input:focus {
  border-color: #007bff;
  outline: none;
  background: #333;
}
</style>

