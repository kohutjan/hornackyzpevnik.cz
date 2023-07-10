import { defineStore } from 'pinia';
import { Song } from 'src/models';

import { XMLParser } from 'fast-xml-parser';

export const useSongsStore = defineStore('songs', {
  state: () => ({
    songs: <Song[]>[],
  }),
  actions: {
    load(xml: string) {
      const parser = new XMLParser();
      const parsedXML = parser.parse(xml);
      this.songs = parsedXML.songs.song;
    },
  },
});
