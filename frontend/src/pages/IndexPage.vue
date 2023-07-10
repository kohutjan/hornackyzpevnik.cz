<template>
  <q-page>
    <div class="row">
      <div class="col">
        <song-list></song-list>
      </div>
    </div>
    <q-separator size="50px" color="white"></q-separator>
    <div class="row">
      <div class="col">
        <song-loader></song-loader>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import SongList from 'components/SongList.vue';
import SongLoader from 'components/SongLoader.vue';
import { ref } from 'vue';
</script>
