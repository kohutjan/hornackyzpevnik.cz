<template>
  <q-card flat bordered class="my-card">
    <q-card-section>
      <div class="text-h6">{{ props.title }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      {{ props.chords }}
    </q-card-section>

    <q-separator inset v-if="props.lyrics" />

    <q-card-section v-if="props.lyrics">
      {{ props.lyrics }}
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed, ref, defineComponent } from 'vue';

defineComponent({
  name: 'SongCard',
});

interface Props {
  title: string;
  chords: string;
  lyrics?: string;
}
const props = withDefaults(defineProps<Props>(), {});
</script>
