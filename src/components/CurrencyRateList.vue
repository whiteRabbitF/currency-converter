<template>
  <div class="rate__list__wrapper">
    <h1>Актуальный курс валют</h1>

    <div class="filter-container">
      <input
          type="text"
          v-model="searchQuery"
          placeholder="Найти валютную пару..."
          class="search-input"
      />
      <select v-model="baseCurrencyFilter" class="currency-filter">
        <option value="">Все базовые валюты</option>
        <option v-for="currency in uniqueBaseCurrencies" :key="currency" :value="currency">
          {{ currency }}
        </option>
      </select>
    </div>

    <div v-if="isLoading" class="loading-container">
      <Loader />
    </div>
    <div v-else-if="Object.keys(filteredRates).length === 0" class="no-data">
      <Loader />
      Нет данных для отображения
    </div>

    <table v-else class="rate-table">
      <thead>
      <tr>
        <th>Курс</th>
        <th>Котируемая валюта</th>
        <th>Базовая валюта</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(rate, pair) in filteredRates" :key="pair">
        <td class="course">{{ roundRate(rate) }}</td>
        <td>{{ pair.split('-')[1].toUpperCase() }}</td>
        <td>{{ pair.split('-')[0].toUpperCase() }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useCurrencyStore } from '@/store/currency';
import Loader from "../../public/loader.vue";

const store = useCurrencyStore();
const searchQuery = ref('');
const baseCurrencyFilter = ref('');
const isLoading = ref(true);

const rates = ref(store.currencyRates);

watch(() => store.currencyRates, (newRates) => {
  rates.value = newRates;
  isLoading.value = false;
}, { immediate: true });

const uniqueBaseCurrencies = computed(() => {
  const currencies = new Set<string>();
  Object.keys(rates.value).forEach(pair => {
    const [base] = pair.split('-');
    currencies.add(base.toUpperCase());
  });
  return Array.from(currencies);
});

const filteredRates = computed(() => {
  return Object.fromEntries(
      Object.entries(rates.value)
          .filter(([pair]) => {
            const [base, quote] = pair.split('-');
            const baseMatches = !baseCurrencyFilter.value || base.toUpperCase() === baseCurrencyFilter.value;
            const queryMatches = pair.toLowerCase().includes(searchQuery.value.toLowerCase());
            return baseMatches && queryMatches;
          })
  );
});

const roundRate = (rate: number): number => {
  return Math.round(rate);
};

</script>
<style scoped lang="scss">
.rate__list__wrapper {
  h1 {
    text-align: center;
    color: #00aaff;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    text-transform: uppercase;
  }

  .filter-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;

    .search-input,
    .currency-filter {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      border: 1px solid #444;
      background-color: #333;
      color: #e0e0e0;
    }

    .search-input {
      flex-grow: 1;
      margin-right: 1rem;
    }

    .currency-filter {
      flex-basis: 30%;
    }
  }

  .rate-table {
    width: 100%;
    border-collapse: collapse;
    background-color: #333;

    .course {
      color: #00aaff;
      font-weight: 600;
      font-size: 18px;
    }

    th, td {
      padding: 0.75rem 1rem;
      text-align: center;
      border: 1px solid #444;
      border-radius: 4px;
      justify-content: center;
    }

    th {
      background-color: #444;
      color: #00aaff;
      text-transform: uppercase;
      border: 1px solid #818181;
    }

    td {
      color: #e0e0e0;
    }

    tr:hover {
      background-color: #444;
    }
  }

  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }

  .no-data {
    text-align: center;
    padding: 20px;
    font-size: 18px;
    color: #e0e0e0;
  }
}
</style>





