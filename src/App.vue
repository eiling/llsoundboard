<template>
  <div id="app">
    <h1>SIF Skill Soundboard</h1>
    <h2>Resources from <a href="https://llsif.org/">llsif.org</a> by <a
        href="https://twitter.com/ShinyZura">ShinyZura</a></h2>
    <label class="volume-controls">
      <span>Volume: {{~~(audioVolume * 1000)}}/1000</span>
      <input id="volume-slider" type="range" min="0" max="1000" @input="changeVolume">
    </label>
    <div class="card-container">
      <card-button v-for="card in cards.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)"
                   :key="card.cardId"
                   :volume="audioVolume"
                   :card-id="`${card.cardId}`"
                   :skill-activation-voice="`${card.skillActivationVoice}`"
      />
    </div>
    <div class="pagination">
      <button class="arrow" @click="firstPage" :disabled="isFirstPage()">first</button>
      <button class="arrow" @click="previousPage" :disabled="isFirstPage()">previous</button>
      <span>page {{currentPage}} of {{totalOfPages()}}</span>
      <button class="arrow" @click="nextPage" :disabled="isLastPage()">next</button>
      <button class="arrow" @click="lastPage" :disabled="isLastPage()">last</button>
    </div>
  </div>
</template>

<script>
import CardButton from '@/components/CardIcon'

export default {
  name: 'App',
  // eslint-disable-next-line vue/no-unused-components
  components: {CardButton},
  data() {
    return {
      cards: [],
      currentPage: 1,
      itemsPerPage: 20,
      volumeSlider: null,
      audioVolume: .05,
    }
  },
  methods: {
    totalOfPages() {
      return Math.ceil(this.cards.length / this.itemsPerPage)
    },
    isFirstPage() {
      return this.currentPage === 1
    },
    isLastPage() {
      return this.currentPage === this.totalOfPages()
    },
    firstPage() {
      this.currentPage = 1
    },
    previousPage() {
      if (!this.isFirstPage()) {
        --this.currentPage
      }
    },
    nextPage() {
      if (!this.isLastPage()) {
        ++this.currentPage
      }
    },
    lastPage() {
      this.currentPage = this.totalOfPages()
    },
    changeVolume() {
      if (this.volumeSlider) {
        this.audioVolume = this.volumeSlider.value / 1000
      }
    },
  },
  mounted() {
    this.volumeSlider = this.$el.querySelector('#volume-slider')
    this.volumeSlider.value = this.audioVolume * 1000

    fetch('/cardData.json')
        .then(res => {
          return res.json()
        })
        .then(obj => {
          this.cards.push(...obj)
        })
  },
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Calibri, Arial, serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  width: fit-content;
  margin: 2rem auto;
}

#app > * {
  margin-bottom: 1rem;
}

h1 {
  font-size: 2rem;
  color: hotpink;
  line-height: 1;
  font-weight: normal;
  margin: 0;
}

h2 {
  font-size: 1rem;
  line-height: 1;
  font-weight: normal;
  margin: 0;
}

h2 > a {
  text-decoration: none;
  color: hotpink;
}

h2 > a:visited {
  color: hotpink;
}

#app > :last-child {
  margin-bottom: 0;
}

.volume-controls {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  width: 100%;
}

.volume-controls > input {
  width: 80%;
}

.card-container {
  display: flex;
  width: calc((128px + 10px + 10px) * 5);;
  flex-wrap: wrap;
}

.card-container > * {
  margin: 10px;
  width: 128px;
}

.pagination {
  display: flex;
  justify-content: space-between;
  width: 20rem;
}
</style>
