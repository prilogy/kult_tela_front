<template>
  <div class="actions">
    <VH2 class="actions__title">Ваши действия</VH2>
    <div class="actions__grid">
      <div
        class="actions__grid__item"
        v-for="action in ACTIONS"
        :key="action.id"
        :style="{
          background: $ds.withOpacity(action.color, 20),
          border: action.color + ' solid 2px'
        }"
      >
        <nuxt-link :to="action.url" style="text-decoration: none">
          <div class="actions__grid__item__inner">
            <VP :color="action.color" class="actions__grid__item__inner__p">
              {{ action.title }}
            </VP>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { VH2, VP } from '../../components'
export default {
  components: { VP, VH2 },
  computed: {
    ...mapGetters({
      ACTIONS: 'userActions/GET_ACTIONS'
    })
  }
}
</script>

<style scoped>
.actions {
}

.actions__title {
  margin-bottom: var(--space-half);
}
.actions__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(50px, max-content));
  grid-gap: var(--space-half);
}
.actions__grid__item {
  border-radius: var(--radius-half);
  padding: var(--space);
  background: #ffffff26;
  border: solid 2px var(--white-base);
}

.actions__grid__item__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}
</style>
