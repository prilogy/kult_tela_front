<template>
  <div>
    <VPageHeading level="3">
      Выбор наставника
      <template v-slot:info>
        Перед началом выберите желаемого наставника, вместе с которым вы
        пройдете путь безопасного похудения!
      </template>
    </VPageHeading>
    <div v-if="tutors">
      <ul>
        <li
          v-for="tutor in tutors"
          @click="selectTutor(tutor)"
          :class="{
            'list-item': true,
            'list-item--selected': currentTutor && currentTutor.id === tutor.id
          }"
        >
          <VH3>{{ tutor.name }}</VH3>
        </li>
      </ul>
    </div>

    <VDivider></VDivider>
    <VButton
      :disabled="!currentTutor"
      @click="setTutor"
      w100
      mt="var(--space-half)"
    >
      Подтвердить выбор
    </VButton>
  </div>
</template>

<script>
import VDivider from '../components/ui/VDivider'
export default {
  components: { VDivider },
  layout: 'noNavAuth',
  data() {
    return {
      tutors: null,
      currentTutor: null
    }
  },
  methods: {
    async setTutor() {
      if (this.currentTutor) {
        const result = await this.$api.Tutor.setTutor({
          tutor_id: this.currentTutor.id
        })
        if (result.success) {
          await this.$store.dispatch(
            'popup/SET_SUCCESS',
            'Наставник успешно выбран. Теперь вы можете связяться с ним на странице Сообщений'
          )
          await this.$store.commit('user/UPDATE_USER', {
            tutor_id: result.data.tutor_id
          })
          this.$router.push('/messages')
        }
      }
    },
    selectTutor(tutor) {
      this.currentTutor = tutor
    }
  },
  async asyncData(ctx) {
    const user = ctx.store.getters['user/GET_USER']
    if (typeof user.tutor_id === 'number') ctx.redirect('/')
    try {
      const { data: tutors } = await ctx.app.$api.Tutor.getAll()
      return { tutors }
    } catch (e) {
      ctx.redirect('/')
    }
  }
}
</script>

<style scoped>
.list-item {
  padding: var(--space-half);
  border-radius: var(--radius);
  border: solid 2px var(--yellow-trans4);
  cursor: pointer;
  background: var(--yellow-trans4);
  margin-bottom: var(--space-half);
}

.list-item--selected {
  border-color: var(--yellow-base);
}
</style>
