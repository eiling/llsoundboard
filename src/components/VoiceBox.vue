<template>
  <div class="container">
    <div class="info-container">
      <div>{{idolName}}</div>
      <div class="voiceText">{{skillActivationVoiceText}}</div>
    </div>
    <div class="cards-container" @click="playSound">
      <img v-for="(cardId, index) in cardIds" :key="index" :src="getIconUrl(cardId)" :alt="cardId" :title="`#${cardId}`">
    </div>
    <audio>
      <source :src="getSoundUrl()">
    </audio>
  </div>
</template>

<script>
export default {
  name: 'VoiceBox',
  props: {
    skillActivationVoiceId: String,
    idolName: String,
    cardIds: Array,
    skillActivationVoiceText: String,
    volume: Number,
  },
  data() {
    return {
      audio: null,
    }
  },
  methods: {
    getIconUrl(cardId) {
      return `https://s.llsif.org/jp/icons/${cardId}.png?${Date.now()}`  // TODO change these to computed props
    },
    getSoundUrl() {
      return `https://s.llsif.org/jp/voices/${this.skillActivationVoiceId}.ogg?${Date.now()}`
    },
    playSound() {
      this.audio.play()
    },
  },
  mounted() {
    this.audio = this.$el.querySelector('audio')
    this.audio.volume = this.volume
  },
  watch: {
    volume(val) {
      this.audio.volume = val
    },
  },
}
</script>

<style scoped>
audio {
  display: none;
}

.container {
  display: flex;
  padding: .25rem;
  border: .1rem hotpink solid;
  max-width: calc(100% - .2rem - .5rem);
}

.info-container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 18rem;
}

.info-container > .voiceText {
  font-size: 1.5rem;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  width: calc(100% - 18rem - 2rem);  /* TODO refactor this please */
  background-color: rgba(255, 105, 180, 0.33);
}

.cards-container > img {
  display: block;
  margin: 1%;
  width: 96px;
  height: 96px;
}
</style>