<template>
  <div class="notifications">
    <VH2 mb="var(--space)">Оповещения</VH2>
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
        <div @click="pushTo(item.url)" v-if="item.url">
          <VIcon icon="back" class="notifications__list__item__icon" />
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
        <div @click="pushTo(item.url)" v-if="item.url">
          <VIcon
            icon="back"
            class="notifications__list__item__icon notifications__list__item__icon-old"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { VH2, VH3, VP, VButton } from '../components/'
import VCaption from '../components/typography/VCaption'
import VIcon from '../components/utils/VIcon'
export default {
  components: { VIcon, VCaption, VButton, VP, VH3, VH2 },
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
      if (this.USER.notifications) return this.USER.notifications.reverse()
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
}

.notifications__list__item p {
  color: var(--grey-light3);
}

.notifications__list__item__icon {
  transform: rotate(180deg);
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
