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
          <VAvatar
            v-if="tutor.avatar_src"
            :image_src="tutor.avatar_src"
            :rank="9"
            class="list-item__avatar"
          ></VAvatar>
          <div class="list-item__info">
            <div>
              <VH3>{{ tutor.name }}</VH3>
              <VP v-show="tutor.admin_description" mt="var(--space-half)">
                {{ tutor.admin_description }}
              </VP>
            </div>
            <VButton
              :class="{
                'list-item__button': true,
                'list-item__button--selected':
                  currentTutor && currentTutor.id === tutor.id
              }"
              w100
            >
              {{
                currentTutor && currentTutor.id === tutor.id
                  ? 'Выбран'
                  : 'Выбрать'
              }}
            </VButton>
          </div>
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
import VAvatar from '../components/ui/VAvatar'
export default {
  components: { VAvatar, VDivider },
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
            'Наставник успешно выбран.'
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
  display: flex;
  background: var(--yellow-trans4);
  margin-bottom: var(--space-half);
}

.list-item__avatar {
  border: 2px solid var(--yellow-base);
}

.list-item .list-item__info {
  margin-left: var(--space-half);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.list-item__button {
  margin-top: auto;
  padding: var(--space-third) 0;
}

.list-item__button--selected {
  background: none;
  border: none;
}

.list-item__button--selected >>> h3 {
  color: var(--white-base);
}

.list-item__button--selected:hover,
.list-item__button--selected:active,
.list-item__button--selected:focus {
  box-shadow: none;
}

.list-item--selected {
  border-color: var(--yellow-base);
  box-shadow: 0 0 50px #eff62133 !important;
}
</style>
