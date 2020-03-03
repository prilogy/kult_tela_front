<template>
  <div class="actions">
    <div class="actions__grid">
      <ActionItem
        class="actions__grid__item"
        v-for="action in ACTIONS"
        :key="action.id"
        :action="action"
      ></ActionItem>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ActionItem from './ActionItem'
export default {
  components: { ActionItem },
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

.actions__grid__item:last-child:nth-child(3n - 1) {
  grid-column: span 2;
}

.actions__grid__item:last-child:nth-child(3n - 2) {
  grid-column: span 3;
}
</style>
