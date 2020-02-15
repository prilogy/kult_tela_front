<template>
  <div>
    <div class="profile" v-if="USER">
      <div class="profile__top">
        <VAvatar
          class="profile__avatar"
          :rank="USER.rank"
          :image_src="USER.avatar_src"
        ></VAvatar>
        <div class="profile__top__info">
          <div>
            <VH3 class="profile__top__info__name" weight="regular">
              {{ USER.name }}
            </VH3>
            <div v-if="info">
              <div class="profile__top__info__item" v-for="item in info">
                <VP>{{ item.title }}</VP>
                <VP>{{ item.value }}</VP>
              </div>
            </div>
            <nuxt-link :to="'/messages/' + USER.id">
              <VButton w100 level="p" mt="var(--space-third)">
                Написать сообщение
              </VButton>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VAvatar } from '../../components/'
export default {
  components: { VAvatar },
  data() {
    return {
      USER: null
    }
  },
  computed: {
    info() {
      const user = this.USER
      const weight_diff = Math.ceil(user.weight_start - user.weight_current)
      return [
        { title: 'Начальный вес', value: user.weight_start + ' кг' },
        {
          title: 'Текущий вес',
          value: `${user.weight_current}${
            weight_diff > 0 ? '(-' + weight_diff + ')' : ''
          } кг`
        },
        { title: 'Служит с', value: user.date_signup },
        { title: 'Войско', value: user.plan_name }
      ]
    }
  },
  async asyncData({ store, params, redirect, ...ctx }) {
    if (parseInt(params.id) === store.getters['user/GET_USER'].id) redirect('/')
    else {
      try {
        const { data: user } = await ctx.app.$api.Public.getUserById(params.id)
        return { USER: user }
      } catch (e) {
        redirect('/')
      }
    }
  }
}
</script>

<style scoped>
.profile__top {
  display: flex;
  margin-bottom: var(--space);
}

.profile__top__info {
  margin-left: var(--space);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.profile__top__info h2 {
  margin-bottom: var(--space-third);
}

.profile__avatar {
  border: solid 2px var(--yellow-base);
}

.profile__top__info__item {
  display: flex;
  flex-wrap: wrap;
  line-height: 1.3;
}

.profile__top__info__name {
  margin-bottom: var(--space-half);
}

.profile__top__info__item > p:first-child {
  color: var(--grey-light3);
  margin-right: var(--space-half);
}
.profile__top__info__item > p:last-child {
  color: var(--yellow-base);
  margin-right: var(--space-half);
}
</style>
