<template>
  <div class="container">
    <h1>Конвертация валюты</h1>
    <div class="converter-form-wrapper">
      <ConverterForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import ConverterForm from '@/components/ConverterForm.vue';
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e1e1e, #2c2c2c);
  padding: 2rem;
  text-transform: uppercase;
}

.converter-form-wrapper {
  background: #2c2c2c;
  border-radius: 17px;
  box-shadow: 0 14px 18px rgba(0, 0, 0, 0.5);
  padding: 3rem;
  max-width: 600px;
  width: 100%;
  margin-bottom: 350px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.6);
  }
}

h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #00aaff;
  text-align: center;
}
</style>