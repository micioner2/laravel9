import { defineStore } from 'pinia'

export const useTitle = defineStore('title', {
    state: () => {
      return { title: '' }
    },

      actions: {
        setTitlePage(newTitle) {
          this.title = newTitle
        },
      },

  });