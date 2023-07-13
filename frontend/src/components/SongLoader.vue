<template>
  <q-form @submit="onSubmit" @reset="onReset">
    <q-input
      filled
      borderless
      v-model="xml"
      label="XML záznam sady"
      lazy-rules
      type="textarea"
      :rules="[(val) => (val && val.length > 0) || '']"
    />

    <div>
      <q-btn label="Vložit" type="submit" color="negative" unelevated />
      <q-btn
        label="Obnovit"
        type="reset"
        color="negative"
        flat
        class="q-ml-sm"
      />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useSongsStore } from 'src/stores/songs';
import { useQuasar } from 'quasar';
import { XMLValidator } from 'fast-xml-parser';

interface Props {
  color?: string;
}
const props = withDefaults(defineProps<Props>(), {});

const $q = useQuasar();

// prettier-ignore
const xml: Ref<string|null> = ref(
  '<set>\n'+
  '  <name>Sada</name>\n' +
  '  <song>\n'+
  '   <title>Sedlácká 1</title>\n' +
  '   <chords>C|D|E|F|G|A|B|H|C</chords>\n' +
  '   <lyrics>Text sedlácké...</lyrics>\n' +
  ' </song>\n' +
  ' <song>\n'+
  '   <title>Verbuňk 5</title>\n' +
  '   <chords>c|d|e|f|g|a|b|h|c</chords>\n' +
  '   <lyrics>Text verbuňku...</lyrics>\n' +
  ' </song>\n' +
  ' <song>\n'+
  '   <title>Táhlá 8</title>\n' +
  '   <chords>C|d|E|f|G|a|B|h|C</chords>\n' +
  '   <lyrics>Text táhlé...</lyrics>\n' +
  ' </song>\n' +
  '</set>');

const songsStore = useSongsStore();

function onSubmit() {
  if (!xml.value || XMLValidator.validate(xml.value) !== true) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'Neplatné XML.',
    });
  } else {
    const setName = songsStore.loadSongSet(xml.value);
    songsStore.setActiveSongSets([setName]);
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Zobrazit',
    });
  }
}

function onReset() {
  xml.value = null;
}
</script>
