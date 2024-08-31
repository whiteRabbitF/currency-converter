import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getCurrencyRates } from '../api/api.ts';
import {CurrencyRate} from "../types/currency.ts";

export const useCurrencyStore = defineStore('currency', () => {
    const supportedCurrencies = ref(['USD', 'EUR', 'RUB']);
    const baseCurrency = ref('RUB');
    const currencyRates = ref<Record<string, number>>({});

    const setBaseCurrency = (currency: string) => {
        baseCurrency.value = currency;
        fetchCurrencyRates();
    };

    const fetchCurrencyRates = async () => {
        try {
            const response = await getCurrencyRates();
            currencyRates.value = response.data;
            console.log('Данные о курсах валют успешно загружены:', currencyRates.value);
        } catch (error) {
            console.error('Не удалось загрузить курсы валют:', error);
        }
    };


    const getRate = (fromCurrency: string, toCurrency: string): number | undefined => {
        const key = `${fromCurrency.toLowerCase()}-${toCurrency.toLowerCase()}`;
        const reverseKey = `${toCurrency.toLowerCase()}-${fromCurrency.toLowerCase()}`;

        if (currencyRates.value[key] !== undefined) {
            return currencyRates.value[key];
        } else if (currencyRates.value[reverseKey] !== undefined) {
            return 1 / currencyRates.value[reverseKey];
        } else {
            console.warn(`Курс для ${fromCurrency} -> ${toCurrency} не найден`);
            return undefined;
        }
    };

    fetchCurrencyRates();

    return {
        supportedCurrencies,
        baseCurrency,
        currencyRates,
        setBaseCurrency,
        getRate,
    };
});
