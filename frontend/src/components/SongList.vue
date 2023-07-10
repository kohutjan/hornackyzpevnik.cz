<template>
  <q-list>
    <div v-for="song in songsStore.songs" :key="song.title">
      <q-item>
        <q-item-section>
          <SongCard
            :title="song.title"
            :chords="song.chords"
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

const songs: Song[] = [];

const songsStore = useSongsStore();

onBeforeMount(() => {
  const title = 'Za horama';
  const chords = 'CD|C|C|G|G|DC|G';
  const lyrcis = 'Za horama za dolama\n tancovala Majdalenka s husárama...';

  for (let i = 0; i < 10; i += 1) {
    songs.push({ title: title, chords: chords, lyrics: lyrcis });
  }
});
</script>
