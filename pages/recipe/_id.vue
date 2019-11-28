<template>
  <div class="recipe">
    <VH2 class="recipe__name">{{ recipe.name }}</VH2>
    <img class="recipe__img" alt="фото продукта" :src="recipe.image_src" />
    <VP class="recipe__desc">{{ recipe.description }}</VP>
    <VH3>Пищевая ценность</VH3>
    <div class="recipe__guide">
      <VP>На 100г порции</VP>
      <VP>Грамм</VP>
    </div>
    <ul class="recipe__info">
      <li v-for="info in productInfo" :key="info.id">
        <div class="recipe__info__item">
          <VP>{{ info.title }}</VP>
          <VP>{{ info.value }}</VP>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { VH2, VH3, VP } from '../../components/'
export default {
  components: { VH3, VH2, VP },
  data() {
    return {
      recipe: {}
    }
  },
  computed: {
    productInfo() {
      return [
        {
          id: 0,
          title: 'Каллорийность',
          value: this.recipe.calories
        },
        {
          id: 1,
          title: 'Белки',
          value: this.recipe.proteins
        },
        {
          id: 2,
          title: 'Жиры',
          value: this.recipe.fat
        },
        {
          id: 3,
          title: 'Углеводы',
          value: this.recipe.carbohydrates
        }
      ]
    }
  },
  async asyncData(ctx) {
    const id = ctx.params.id
    let { data: recipe } = await ctx.app.$api.Recipes.getById(id)
    recipe.image_src = ctx.app.$api.getImageLink(recipe.image_src)
    return { recipe }
  }
}
</script>

<style scoped>
.recipe__img {
  margin: var(--space-half) 0;
  width: 100%;
}

.recipe__desc {
  margin-bottom: var(--space-half);
}

.recipe__guide {
  display: flex;
  justify-content: space-between;
  margin: var(--space-half) 0;
}

.recipe__guide p {
  color: var(--grey-light2);
}

.recipe__info__item {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-third);
}

.recipe__info__item p:last-child {
  color: var(--yellow-base);
}
</style>
