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
      <span>{{currentPage}} of {{totalOfPages()}}</span>
      <button class="arrow" @click="nextPage" :disabled="isLastPage()">next</button>
      <button class="arrow" @click="lastPage" :disabled="isLastPage()">last</button>
    </div>
    <label>
      Go to page:
      <input type="number" :min="1" :max="totalOfPages()" v-model="pageToJump">
      <button @click="jumpToPage">Go</button>
    </label>
  </div>
</template>

<script>
import CardButton from '@/components/CardIcon'

export default {
  name: 'App',
  components: {CardButton},
  data() {
    return {
      cards: [],
      currentPage: 1,
      itemsPerPage: 20,
      volumeSlider: null,
      audioVolume: .05,
      pageToJump: 1,
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
    jumpToPage() {
      if (this.pageToJump >= 1 && this.pageToJump <= this.totalOfPages())
      this.currentPage = this.pageToJump
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

    fetch('/llsoundboard/cardData.json')
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
  width: 100%;
  max-width: 60rem;
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
  width: 80%;
}

.volume-controls > span {
  width: 20%;
}

.volume-controls > input {
  width: 80%;
}

.card-container {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
}

.card-container > * {
  margin: 1%;
  width: 128px;
  max-width: 23%;
}

.pagination {
  display: flex;
  justify-content: space-between;
  width: 20rem;
  max-width: 80%;
}

@media screen and (max-width: 40em) {
  .volume-controls {
    display: flex;
    flex-direction: column;
    width: 80%;
  }

  .volume-controls > span {
    width: 100%;
    text-align: center;
  }

  .volume-controls > input {
    width: 100%;
  }
}
</style>
