import { defineStore } from "pinia";

interface ImageState {
  placeholder: string;
}

export const useImageStore = defineStore("image", {
  state: (): ImageState => ({
    placeholder: "https://faume.imgix.net/1000/placeholder.svg",
  }),
});
