<template>
  <q-select
    filled
    v-model="selection"
    use-input
    input-debounce="0"
    label="Vybrané sady písniček"
    :options="options"
    @filter="filterFn"
    style="width: 250px"
    behavior="menu"
    clearable
    multiple
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> No results </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted, watch } from 'vue';
import { useSongsStore } from 'src/stores/songs';

interface Props {
  color?: string;
}
const props = withDefaults(defineProps<Props>(), {});

const options: Ref<string[]> = ref([]);
const selection: Ref<string[] | null> = ref([]);

const songsStore = useSongsStore();

watch(selection, (newValue) => {
  if (newValue === null) {
    songsStore.setActiveSongSets([]);
  } else {
    const selectionSet = new Set(newValue);
    if (!eqSet(songsStore.activeSetNames, selectionSet)) {
      songsStore.setActiveSongSets(newValue);
    }
  }
});

watch(songsStore.activeSetNames, (newValue) => {
  selection.value = [...newValue];
});

onMounted(() => {
  songsStore.setActiveSongSets([...songsStore.allSongSets.keys()]);
});

const songSets = import.meta.glob('../assets/song_sets/*.xml', { as: 'raw' });
for (const filePath in songSets) {
  const fileContent: string = songSets[filePath].toString();
  songsStore.loadSongSet(fileContent);
}

function filterFn(val: string, update: (fn: () => void) => void) {
  if (val === '') {
    update(() => {
      options.value = [...songsStore.allSongSets.keys()];
    });
  } else {
    update(() => {
      const needle = val.toLowerCase();
      options.value = [...songsStore.allSongSets.keys()].filter(
        (v) => v.toLowerCase().indexOf(needle) > -1
      );
    });
  }
}

function eqSet(xs: Set<string>, ys: Set<string>) {
  return xs.size === ys.size && [...xs].every((x) => ys.has(x));
}
</script>
