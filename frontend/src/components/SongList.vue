<template>
  <q-list>
    <div v-for="song in songsStore.activeSongs" :key="song.title">
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
import SongCard from 'src/components/SongCard.vue';
import { useSongsStore } from 'src/stores/songs';

const songsStore = useSongsStore();
</script>
