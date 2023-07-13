<template>
  <q-list>
    <div v-for="song in songsStore.songs" :key="song.title">
      <q-item>
        <q-item-section>
          <SongCard
            :title="song.title"
            :defaultChordNotation="song.chords"
            :lyrics="song.lyrics"
          ></SongCard>
        </q-item-section>
      </q-item>
    </div>
  </q-list>
</template>

<script setup lang="ts">
import { computed, ref, onBeforeMount } from 'vue';
import { Song } from 'src/models';
import SongCard from 'src/components/SongCard.vue';
import { useSongsStore } from 'src/stores/songs';

interface Props {
  color?: string;
}
const props = withDefaults(defineProps<Props>(), {});

const songsStore = useSongsStore();
</script>
