<template>
  <div>
    <div class="bg" v-if="NOTIFICATION"></div>
    <transition name="showup">
      <div
        :class="{
          notification: true,
          'notification-downranked': NOTIFICATION.downranked === true,
          'notification-upranked': NOTIFICATION.downranked === false
        }"
        v-if="NOTIFICATION"
      >
        <VH2 class="notification__h2">{{ NOTIFICATION.title }}</VH2>
        <VAvatar
          class="notification__avatar"
          :image_src="USER.avatar_src"
          :rank="USER.rank"
        ></VAvatar>

        <VP class="success__text">{{ NOTIFICATION.description }}</VP>
        <VButton
          class="notification__button"
          @click="closeModal"
          w100
          weight="regular"
        >
          Так точно!
        </VButton>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VButton from '../ui/VButton'
import VP from '../typography/VP'
import VAvatar from '../ui/VAvatar'
import VH2 from '../typography/VH2'

export default {
  components: { VH2, VAvatar, VP, VButton },
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
  z-index: 101;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background: var(--grey-trans1);
}
.notification {
  z-index: 102;
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
  border-radius: var(--radius);
  max-width: var(--body-max-width);
}

.notification-upranked {
  box-shadow: 0 0 60px var(--yellow-trans1);
  border: solid 2px var(--yellow-base);
}

.notification-upranked .notification__avatar {
  border: solid 2px var(--yellow-base);
  box-shadow: 0 0 30px -10px var(--yellow-base);
}

.notification-downranked {
  border: solid 2px var(--red-base);
  box-shadow: 0 0 60px -10px var(--red-base);
}

.notification-downranked .notification__h2 {
  color: var(--red-base);
}

.notification-downranked .notification__button {
  background: var(--red-base);
}

.notification-downranked .notification__avatar {
  border: solid 2px var(--grey-light2);
  background: var(--grey-light2);
  box-shadow: 0 0 50px var(--grey-light2);
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
