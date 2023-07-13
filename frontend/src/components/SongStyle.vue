<template>
  <div class="q-pa-md">
    <q-option-group :options="options" type="toggle" v-model="group" />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted, watch } from 'vue';
import { useStyleStore } from 'src/stores/style';

interface Props {
  color?: string;
}
const props = withDefaults(defineProps<Props>(), {});

const group: Ref<string[]> = ref([]);

const options = [
  { label: 'Název', value: 'showTitle', color: 'red' },
  { label: 'Texty', value: 'showLyrics', color: 'red' },
  { label: 'Tlačítka', value: 'showButtons', color: 'red' },
];

const styleStore = useStyleStore();

onMounted(() => {
  group.value = ['showTitle', 'showLyrics', 'showButtons'];
});

watch(group, (newValue) => {
  group.value.includes('showTitle')
    ? (styleStore.showTitle = true)
    : (styleStore.showTitle = false);
  group.value.includes('showLyrics')
    ? (styleStore.showLyrics = true)
    : (styleStore.showLyrics = false);
  group.value.includes('showButtons')
    ? (styleStore.showButtons = true)
    : (styleStore.showButtons = false);
});
</script>
