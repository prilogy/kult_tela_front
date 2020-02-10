<template>
  <div>
    <VPageHeading level="3" button>
      Питательные вещества
      <template v-slot:info>
        Основные питательные вещества, из которых состоит наша пища – это белки,
        углеводы, жиры, витамины, минеральные вещества, вода и клетчатка.
      </template>
    </VPageHeading>
    <ul class="list">
      <li class="list__item" @click="goTo('/proteins')">
        <VH3>Белки</VH3>
      </li>
      <li class="list__item" @click="goTo('/fats')">
        <VH3>Жиры</VH3>
      </li>
      <li class="list__item" @click="goTo('/carbohydrates')">
        <VH3>Углеводы</VH3>
      </li>
      <li class="list__item" @click="goTo('/water')">
        <VH3>Вода</VH3>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    goTo(link) {
      this.$router.push('/food/tips/nutrients' + link)
    }
  }
}
</script>

<style>
.list {
}
.list__item {
  padding: var(--space-third);
  cursor: pointer;
  border-radius: var(--radius-half);
}
.list__item:hover,
.list__item:active,
.list__item:focus {
  background: var(--white-trans4);
}
</style>
