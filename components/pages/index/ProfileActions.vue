<template>
  <div class="actions">
    <VH2 class="actions__title">Ваши действия</VH2>
    <div class="actions__grid">
      <ActionItem
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
</style>
