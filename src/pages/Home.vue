<template>
  <div class="container">
    <div class="content-wrapper">
      <CurrencyRateList />
    </div>
  </div>
</template>

<script setup lang="ts">
import CurrencyRateList from '@/components/CurrencyRateList.vue';
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(120deg, #2e2e2e, #1e1e1e);
  padding: 2rem;
}

.content-wrapper {
  background: #2c2c2c;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  padding: 2rem;
  max-width: 800px;
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.6);
  }
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #00aaff;
  text-align: center;
}
</style>

