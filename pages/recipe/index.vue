<template>
  <div class="recipes">
    <VH1 class="recipes__h1">Рецепты</VH1>
    <div class="recipes__guide">
      <VP>Название</VP>
      <VP>Ккал / 100г</VP>
    </div>
    <div class="recipes__list">
      <div v-for="recipe in recipes" :key="recipe.id">
        <nuxt-link :to="'/recipe/' + recipe.id">
          <div class="recipes__list__info">
            <VH3>{{ recipe.name }}</VH3>
            <VH3>{{ recipe.calories }}</VH3>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { VH1, VH3, VP } from '../../components/'
export default {
  components: { VH3, VH1, VP },
  data() {
    return {
      recipes: []
    }
  },
  async asyncData(ctx) {
    const { data: recipes } = await ctx.app.$api.Recipes.getAllForList()
    return { recipes }
  }
}
</script>

<style scoped>
.recipes__h1 {
  margin-bottom: var(--space-half);
}

.recipes__list__info {
  display: flex;
  justify-content: space-between;
}

.recipes__list__info h3 {
  margin-bottom: var(--space-third);
}

.recipes__guide {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-half);
}

.recipes__guide p {
  color: var(--grey-light2);
}
</style>
