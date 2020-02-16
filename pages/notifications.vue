<template>
  <div class="notifications">
    <VPageHeading>Оповещения</VPageHeading>
    <div v-if="!NOTIFICATIONS">
      <VH3
        weight="regular"
        color="var(--grey-light3)"
        style="text-align: center"
      >
        Оповещений пока нет!
      </VH3>
    </div>
    <div v-else class="notifications__list">
      <div
        class="notifications__list__item notifications__list__item-new"
        v-for="item in NEW_NOTIFICATIONS"
        :key="item.id"
      >
        <VP>
          {{ item.title }}
        </VP>
        <div @click="pushTo(item.url)" v-if="item.url !== 'null'">
          <svg
            class="notifications__list__item__icon"
            viewBox="0 0 28 27"
            width="28"
            height="27"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.5 11.833H7.483l6.175-6.175-1.65-1.65L3.018 13l8.992 8.991 1.65-1.65-6.176-6.174H24.5v-2.334z"
            />
          </svg>
        </div>
      </div>
      <VP
        weight="regular"
        mb="var(--space-half)"
        color="var(--grey-light2)"
        style="text-align: center"
      >
        Старые оповещения
      </VP>
      <div
        class="notifications__list__item"
        v-for="item in OLD_NOTIFICATIONS"
        :key="item.id"
      >
        <VP>
          {{ item.title }}
        </VP>
        <div @click="pushTo(item.url)" v-if="item.url !== 'null'">
          <svg
            class="notifications__list__item__icon notifications__list__item__icon-old"
            viewBox="0 0 28 27"
            width="28"
            height="27"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.5 11.833H7.483l6.175-6.175-1.65-1.65L3.018 13l8.992 8.991 1.65-1.65-6.176-6.174H24.5v-2.334z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VIcon from '../components/utils/VIcon'
export default {
  components: { VIcon },
  methods: {
    pushTo(url) {
      this.$router.push(url)
    },
    ...mapActions({
      SET_LAST_SEEN_NOTIFICATION: 'user/SET_LAST_SEEN_NOTIFICATION'
    })
  },
  computed: {
    LAST_SEEN_ID() {
      return this.USER.notifications_last_seen
    },
    NOTIFICATIONS() {
      if (this.USER.notifications)
        return this.USER.notifications.slice().reverse()
      else return []
    },
    NEW_NOTIFICATIONS() {
      return this.NOTIFICATIONS.filter(item => item.id > this.LAST_SEEN_ID)
    },
    OLD_NOTIFICATIONS() {
      return this.NOTIFICATIONS.filter(item => item.id <= this.LAST_SEEN_ID)
    },
    ...mapGetters({
      USER: 'user/GET_USER'
    })
  },
  destroyed() {
    this.SET_LAST_SEEN_NOTIFICATION()
  }
}
</script>

<style scoped>
.notifications__list__item {
  padding: var(--space-half);
  margin-bottom: var(--space-third);
  border-radius: var(--radius-half);
  background: var(--grey-light1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notifications__list__item p {
  color: var(--grey-light3);
}

.notifications__list__item__icon {
  transform: rotate(180deg);
}

.notifications__list__item__icon path {
  fill: var(--yellow-base);
}

.notifications__list__item__icon-old {
  filter: saturate(0);
  opacity: 0.5;
}

.notifications__list__item-new {
  background: var(--yellow-trans3);
}

.notifications__list__item-new p {
  color: var(--yellow-base);
}
</style>
