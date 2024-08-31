<template>
  <header class="header">
    <nav class="nav">
      <router-link to="/" class="nav-link" exact-active-class="active-link">Главная</router-link>
      <router-link to="/convert" class="nav-link" exact-active-class="active-link">Конвератация</router-link>
    </nav>
    <CurrencyDropdown v-model="selectedCurrency" class="currency-dropdown" />
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useCurrencyStore } from '../store/currency.ts';
import CurrencyDropdown from '../components/CurrencyDropdown.vue';

const store = useCurrencyStore();
const selectedCurrency = ref(store.baseCurrency);

watch(selectedCurrency, (newCurrency) => {
  store.setBaseCurrency(newCurrency);
});
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1e1e1e;
  border-bottom: 1px solid #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  color: #e0e0e0;
}

.nav {
  display: flex;
  gap: 1rem;
  font-weight: 600;
}

.nav-link {
  font-size: 20px;
  text-decoration: none;
  color: #00aaff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease; /* Плавные переходы */

  &:hover, &:focus {
    background-color: #333;
    color: #e0e0e0;
    transform: scale(1.05);
  }

  &:active {
    background-color: #444;
    color: #e0e0e0;
  }
}

.nav-link.active-link {
  background-color: #007bff;
  color: #fff;
}

.currency-dropdown {
  width: 200px;
  background-color: #2c2c2c;
  color: #e0e0e0;
  border: 1px solid #444;
  border-radius: 15px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.currency-dropdown:hover, .currency-dropdown:focus {
  background-color: #333;
  border-color: #007bff;
}
</style>


