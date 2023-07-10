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

function transposeChords(numberOfSemitones: number) {
  // prettier-ignore
  const transposeRulesUp = {
    'c': 'c#',
    'd': 'es',
    'e': 'f',
    'f': 'f#',
    'g': 'as',
    'a': 'b',
    'b': 'h',
    'h': 'c',
    'cs': 'c',
    'c#': 'd',
    'ds': 'd',
    'd#': 'e',
    'es': 'e',
    'e#': 'f#',
    'fs': 'f',
    'f#': 'g',
    'gs': 'g',
    'g#': 'a',
    'as': 'a',
    'a#': 'h',
    'bs': 'b',
    'b#': 'c',
    'hs': 'h',
    'h#': 'c#',

    'C': 'C#',
    'D': 'Es',
    'E': 'F',
    'F': 'F#',
    'G': 'As',
    'A': 'B',
    'B': 'H',
    'H': 'C',
    'Cs': 'C',
    'C#': 'D',
    'Ds': 'D',
    'D#': 'E',
    'Es': 'E',
    'E#': 'F#',
    'Fs': 'F',
    'F#': 'G',
    'Gs': 'G',
    'G#': 'A',
    'As': 'A',
    'A#': 'H',
    'Bs': 'B',
    'B#': 'C',
    'Hs': 'H',
    'H#': 'C#'
  }

  // prettier-ignore
  const transposeRulesDown = {
    'c': 'h',
    'd': 'c#',
    'e': 'es',
    'f': 'e',
    'g': 'f#',
    'a': 'as',
    'b': 'a',
    'h': 'b',
    'cs': 'b',
    'c#': 'c',
    'ds': 'c',
    'd#': 'd',
    'es': 'd',
    'e#': 'e',
    'fs': 'es',
    'f#': 'f',
    'gs': 'f',
    'g#': 'g',
    'as': 'g',
    'a#': 'a',
    'bs': 'as',
    'b#': 'b',
    'hs': 'a',
    'h#': 'h',

    'C': 'H',
    'D': 'C#',
    'E': 'Es',
    'F': 'E',
    'G': 'F#',
    'A': 'As',
    'B': 'A',
    'H': 'B',
    'Cs': 'B',
    'C#': 'C',
    'Ds': 'C',
    'D#': 'D',
    'Es': 'D',
    'E#': 'E',
    'Fs': 'Es',
    'F#': 'F',
    'Gs': 'F',
    'G#': 'G',
    'As': 'G',
    'A#': 'A',
    'Bs': 'As',
    'B#': 'B',
    'Hs': 'A',
    'H#': 'H',
  }
  return;
}

function chordsToTokens(
  chords: string
): { base: string; augmentations?: string }[] {
  const baseNotes = new Set([
    'c',
    'd',
    'e',
    'f',
    'g',
    'a',
    'b',
    'h',
    'C',
    'D',
    'E',
    'F',
    'G',
    'A',
    'B',
    'H',
  ]);
  const sharpFlat = new Set(['#', 's']);

  const tokens: { base: string; augmentations?: string }[] = [];

  let actualChordChar: string;
  for (let i = 0; i < chords.length; i++) {
    actualChordChar = chords.charAt(i);
    let base: string;
    let augmentations = '';

    if (actualChordChar === '|') {
      base = '|';
    } else if (baseNotes.has(actualChordChar)) {
      if (i + 1 < chords.length && sharpFlat.has(chords.charAt(i + 1))) {
        base = actualChordChar + chords.charAt(i + 1);
        i += 1;
      } else {
        base = actualChordChar;
      }
    } else {
      continue;
    }

    i += 1;
    for (; i < chords.length; i++) {
      actualChordChar = chords.charAt(i);
      if (actualChordChar === '|' || baseNotes.has(actualChordChar)) break;
      augmentations += actualChordChar;
    }

    tokens.push({ base, augmentations });
  }

  return tokens;
}

function tokensToChords(
  tokens: { base: string; augmentations?: string }[]
): string {
  let chords = '';

  tokens.forEach((token) => {
    chords += token.base + token.augmentations;
  });

  return chords;
}
</script>
