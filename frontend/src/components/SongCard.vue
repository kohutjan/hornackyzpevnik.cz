<template>
  <q-card flat bordered class="my-card">
    <q-card-section v-if="styleStore.showTitle">
      <div class="text-h6">{{ props.title }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div v-for="(chordNotation, index) in chordNotations" :key="index">
        <div class="row">
          <div class="col-1">
            <q-btn-group push class="float-left" v-if="styleStore.showButtons">
              <div v-if="index === 0">
                <q-btn
                  color="green"
                  text-color="white"
                  label="v"
                  dense
                  @click="
                    () => {
                      chordNotations.push(chordNotation);
                    }
                  "
                />
              </div>
              <div v-else>
                <q-btn
                  color="red"
                  text-color="white"
                  label="x"
                  dense
                  @click="
                    () => {
                      chordNotations.splice(index, 1);
                    }
                  "
                />
              </div>
            </q-btn-group>
          </div>
          <div
            class="col-9 text-weight-bold text-h6"
            v-if="styleStore.showButtons"
          >
            {{ chordNotation }}
          </div>
          <div class="col-12 text-weight-bold text-h6" v-else>
            {{ chordNotation }}
          </div>
          <div class="col-2">
            <q-btn-group push class="float-right" v-if="styleStore.showButtons">
              <q-btn
                color="white"
                text-color="black"
                label="-"
                dense
                @click="
                  () => {
                    chordNotations[index] = transposeChords(
                      chordNotation,
                      transpositionRulesDown
                    );
                  }
                "
              />
              <q-btn
                color="white"
                text-color="black"
                label="+"
                dense
                @click="
                  () => {
                    chordNotations[index] = transposeChords(
                      chordNotation,
                      transpositionRulesUp
                    );
                  }
                "
              />
            </q-btn-group>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator inset v-if="props.lyrics && styleStore.showLyrics" />

    <q-card-section
      v-if="props.lyrics && styleStore.showLyrics"
      style="white-space: normal"
    >
      <div class="text-weight-regular text-body1" style="width: inherit">
        <div
          v-for="(line, index) of props.lyrics.split('\n')"
          v-bind:key="index"
        >
          <div class="row">{{ line.trim() }}<br /></div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useStyleStore } from 'src/stores/style';
import { ref, Ref, defineComponent, watch, onMounted } from 'vue';
import { Dictionary, Token } from 'src/models';

defineComponent({
  name: 'SongCard',
});

interface Props {
  title: string;
  defaultChordNotation: string;
  lyrics?: string;
}
const props = defineProps<Props>();

const chordNotations: Ref<string[]> = ref([]);

const styleStore = useStyleStore();

onMounted(() => {
  chordNotations.value.push(validateChords(props.defaultChordNotation));
});

watch(
  () => props.defaultChordNotation,
  (newValue) => {
    const newDefaultChords = validateChords(newValue);
    if (newDefaultChords !== chordNotations.value[0]) {
      chordNotations.value = [newDefaultChords];
    }
  }
);

const $q = useQuasar();

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
const delimiters = new Set(['|', ':']);

// prettier-ignore
const transpositionRulesUp: Dictionary<string> = {
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
const transpositionRulesDown: Dictionary<string> = {
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
  'H#': 'H'
}

function transposeChords(
  chords: string,
  transpositionRules: Dictionary<string>
) {
  const tokens = chordsToTokens(chords);
  const transposedTokens = transposeTokens(tokens, transpositionRules);
  return tokensToChords(transposedTokens);
}

function transposeTokens(
  tokens: Token[],
  transpositionRules: Dictionary<string>
): Token[] {
  const transposedTokens: Token[] = [];
  tokens.forEach((token) => {
    if (token.base in transpositionRules) {
      transposedTokens.push({
        base: transpositionRules[token.base],
        augmentations: token.augmentations,
      });
    } else if (delimiters.has(token.base)) {
      transposedTokens.push(token);
    } else {
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message:
          props.title +
          'se nelze transponovat. ' +
          token.base +
          'není v transpozičních pravidlech',
      });
      return tokens;
    }
  });
  return transposedTokens;
}

function chordsToTokens(chords: string): Token[] {
  const tokens: Token[] = [];

  let actualChordChar: string;
  for (let i = 0; i < chords.length; i++) {
    actualChordChar = chords.charAt(i);
    let base: string;
    let augmentations = '';

    if (delimiters.has(actualChordChar)) {
      base = actualChordChar;
    } else if (baseNotes.has(actualChordChar)) {
      if (i + 1 < chords.length && sharpFlat.has(chords.charAt(i + 1))) {
        base = actualChordChar + chords.charAt(i + 1);
        i += 1;
      } else {
        base = actualChordChar;
      }
    } else {
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message:
          'Znak "' +
          actualChordChar +
          '" v zápisu písně ' +
          props.title +
          ' byl ignorován.',
      });
      continue;
    }

    i += 1;
    for (; i < chords.length; i++) {
      actualChordChar = chords.charAt(i);
      if (actualChordChar === '|' || baseNotes.has(actualChordChar)) {
        i -= 1;
        break;
      }
      augmentations += actualChordChar;
    }

    tokens.push({ base, augmentations });
  }

  return tokens;
}

function tokensToChords(tokens: Token[]): string {
  let chords = '';

  tokens.forEach((token) => {
    chords += token.base + token.augmentations;
  });

  return chords;
}

function validateChords(chords: string) {
  return tokensToChords(chordsToTokens(chords));
}
</script>
