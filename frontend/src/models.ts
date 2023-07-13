export interface Song {
  title: string;
  chords: string;
  lyrics?: string;
}

export interface Token {
  base: string;
  augmentations?: string;
}

export interface Dictionary<T> {
  [Key: string]: T;
}
