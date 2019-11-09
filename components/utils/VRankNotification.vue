<template>
  <div>
    <div class="bg" v-if="NOTIFICATION"></div>
    <transition name="showup">
      <div class="notification" v-if="NOTIFICATION">
        <VH2>{{ NOTIFICATION.title }}</VH2>
        <VAvatar :image_src="USER.avatar_src" :rank="USER.rank"></VAvatar>

        <VP class="success__text">{{ NOTIFICATION.description }}</VP>
        <VButton @click="closeModal" w100 weight="regular">Закрыть</VButton>
      </div>
    </transition>
  </div>
</template>

<script>
import { VP, VH2, VAvatar, VButton } from '../'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    VButton,
    VP,
    VH2,
    VAvatar
  },
  methods: {
    closeModal() {
      this.SET_NOTIFICATION(null)
    },
    ...mapActions({
      SET_NOTIFICATION: 'rank/SET_NOTIFICATION'
    })
  },
  computed: {
    ...mapGetters({
      NOTIFICATION: 'rank/GET_RANK_NOTIFICATION',
      USER: 'user/GET_USER'
    })
  }
}
</script>

<style scoped>
.bg {
  z-index: 9;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background: var(--grey-trans1);
}
.notification {
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background: var(--grey-base);
  position: fixed;
  padding: var(--space);
  width: 70vw;
  height: fit-content;
  margin: auto;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  box-shadow: 0 0 20px var(--yellow-trans1);
  border: solid 2px var(--yellow-base);
}
.notification h2 {
  text-align: center;
  font-weight: 400;
  margin-bottom: var(--space);
}
.notification p {
  margin: var(--space) 0;
  text-align: center;
}
</style>
