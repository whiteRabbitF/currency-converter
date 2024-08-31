<template>
  <div class="dropdown-wrapper">
    <select v-model="selected" @change="updateSelectedCurrency" class="dropdown-select">
      <option v-for="currency in currencies" :key="currency" :value="currency">
        {{ currency }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue';
import { useCurrencyStore } from '../store/currency.ts';

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits(['update:modelValue']);

const store = useCurrencyStore();
const selected = ref(props.modelValue);

const currencies = computed(() => store.supportedCurrencies);

const updateSelectedCurrency = () => {
  emit('update:modelValue', selected.value);
};
</script>

<style scoped lang="scss">
.dropdown-wrapper {
  position: relative;
  display: inline-block;
  width: 300px;
  border-radius: 17px;
}

.dropdown-select {
  width: 100%;
  padding: 15px 15px;
  border: 1px solid #ccc;
  border-radius: 15px;
  height: 66px;
  background-color: #242424;
  font-size: 18px;
  font-weight: 700;
  color: #e0e0e0;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  option {
    padding: 10px;
  }

  &:hover {
    border-color: #007bff;
  }
}

.dropdown-select::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 15px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #333;
  transform: translateY(-50%);
  transition: all 0.3s ease;
}

.dropdown-select:focus::after {
  border-top-color: #b0adad;
}
</style>
