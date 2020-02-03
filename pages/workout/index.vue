<template>
  <div>
    <VPageHeading>Центр тренировок</VPageHeading>
    <div class="actions">
      <ActionItem
        v-for="action in actions"
        :key="action.id"
        :action="action"
      ></ActionItem>
    </div>
  </div>
</template>

<script>
import ActionItem from '../../components/pages/index/ActionItem'
export default {
  components: { ActionItem },
  data() {
    return {
      actions: [
        {
          id: 0,
          title: 'Персональная программа',
          color: '#00eeff',
          url: '/workout/personal'
        },
        {
          id: 1,
          title: 'Советы',
          color: '#6577ff',
          url: '/workout/personal'
        },
        {
          id: 2,
          title: 'Все упражнения',
          color: '#ff3b9b',
          url: '/workout/exercise'
        }
      ]
    }
  }

  // middleware({ store, redirect }) {
  //   const currentPlan = store.getters['user/GET_USER'].plan_id
  //   if (currentPlan < 1) {
  //     return redirect('/workout/exercise')
  //   } else {
  //     return redirect('/workout/personal')
  //   }
  // }
}
</script>

<style scoped>
.actions {
  margin-top: var(--space);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(50px, max-content));
  grid-gap: var(--space-half);
}
</style>
