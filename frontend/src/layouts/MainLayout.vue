<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      class="bg-negative text-white"
      height-hint="98"
      reveal
      :reveal-offset="0"
    >
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Horňácký zpěvník </q-toolbar-title>
      </q-toolbar>

      <!--
      <q-tabs align="left">
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs>
      -->
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :width="160"
    >
      <song-style></song-style>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SongStyle from 'src/components/SongStyle.vue';

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
