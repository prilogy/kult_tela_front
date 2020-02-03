<template>
  <div>
    <VPageHeading>
      Советы по тренировкам
      <template v-slot:info>
        Наши эксперты составили советы и наиболее общие правила техники
        безопасности для вас.
      </template>
    </VPageHeading>
    <ul class="list">
      <li v-for="item in list" :key="item.id">
        <nuxt-link :to="item.url">
          <VH3>{{ item.title }}</VH3>
        </nuxt-link>
      </li>
    </ul>
    <VTipSmall mt="var(--space-half)">
      <VP color="var(--grey-light3)">
        Во избещание непредвиденных ситуаций, настоятельно рекомундуем
        ознакомиться со всеми разделами
      </VP>
    </VTipSmall>
  </div>
</template>

<script>
import VTipSmall from '../../../components/ui/VTipSmall'
export default {
  components: { VTipSmall },
  data() {
    return {
      list: [
        {
          id: 0,
          title: 'Общие советы',
          url: '/workout/tips/common'
        },
        {
          id: 0,
          title: 'Если у вас проблемы со здоровьем',
          url: '/workout/tips/health'
        }
      ]
    }
  }
}
</script>

<style scoped>
.list {
  list-style: circle;
  margin-left: var(--space);
}

.list li {
  color: var(--yellow-base);
  margin-bottom: var(--space-third);
}
</style>
