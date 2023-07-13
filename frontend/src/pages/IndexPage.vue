<template>
  <q-page>
    <div class="row">
      <div class="col">
        <song-list></song-list>
      </div>
    </div>
    <div class="row q-pt-sm">
      <div class="col">
        <song-picker></song-picker>
      </div>
    </div>
    <div class="row q-pt-sm">
      <div class="col">
        <song-loader></song-loader>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import SongList from 'components/SongList.vue';
import SongLoader from 'components/SongLoader.vue';
import SongPicker from 'src/components/SongPicker.vue';
import { ref } from 'vue';
</script>
