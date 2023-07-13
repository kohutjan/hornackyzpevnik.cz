import { defineStore } from 'pinia';
import { Song } from 'src/models';

import { XMLParser } from 'fast-xml-parser';

export const useSongsStore = defineStore('songs', {
  state: () => ({
    allSongSets: <Map<string, Song[]>>new Map(),
    activeSetNames: <Set<string>>new Set(),
    activeSongs: <Song[]>[],
  }),
  actions: {
    loadSongSet(xml: string): string {
      const parser = new XMLParser();
      const parsedXML = parser.parse(xml);
      this.allSongSets.set(parsedXML.set.name, parsedXML.set.song);
      return parsedXML.set.name;
    },

    setActiveSongSets(names: string[]) {
      this.activeSetNames.clear();
      this.activeSongs = [];
      names.forEach((name) => {
        const songs = this.allSongSets.get(name);
        if (songs) {
          this.activeSetNames.add(name);
          this.activeSongs = this.activeSongs.concat(songs);
        }
      });
    },
  },
});
