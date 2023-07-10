<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
    <q-input
      filled
      borderless
      v-model="xml"
      label="XML záznam písniček"
      hint="Popis XML záznamu písniček se nachází v záložce ..."
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

const xml: Ref<string | null> = ref(null);

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
    songsStore.load(xml.value);
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Vloženo',
    });
  }
}

function onReset() {
  xml.value = null;
}
</script>
