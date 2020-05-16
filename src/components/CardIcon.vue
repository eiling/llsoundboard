<template>
  <div class="container">
    <img :src="getIconUrl()" :alt="cardId" @click="playSound">
    <a :href="getSoundUrl()" @click="e => e.preventDefault()">#{{cardId}}</a>
    <audio>
      <source :src="getSoundUrl()">
    </audio>
  </div>
</template>

<script>
export default {
  name: 'CardButton',
  props: {
    cardId: String,
    skillActivationVoice: String,
    volume: Number,
  },
  data() {
    return {
      audio: null,
    }
  },
  methods: {
    getIconUrl() {
      return `https://s.llsif.org/jp/icons/${this.cardId}.png?${Date.now()}`
    },
    getSoundUrl() {
      return `https://s.llsif.org/jp/voices/${this.skillActivationVoice}.ogg?${Date.now()}`
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

img {
  display: block;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  line-height: 1;
}

.container > * {
  margin-bottom: .2rem;
}

.container > :last-child {
  margin-bottom: 0;
}

a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  cursor: pointer;
  color: hotpink;
}

a:visited {
  color: inherit;
}
</style>