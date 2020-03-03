<template>
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
            {{ USER.first_name + ' ' + USER.last_name }}
          </VH3>
          <div v-if="info">
            <div class="profile__top__info__item" v-for="item in info">
              <VP>{{ item.title }}</VP>
              <VP>{{ item.value }}</VP>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ProfileActions v-if="USER.is_subscription"></ProfileActions>
    <ExtendSubscription v-else-if="!USER.is_subscription"></ExtendSubscription>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { VAvatar } from '../components/'
import { ProfileActions, ExtendSubscription } from '../components/pages/index/'
export default {
  components: { ProfileActions, VAvatar, ExtendSubscription },
  computed: {
    info() {
      const user = this.USER
      const weight_diff = Math.ceil(user.weight_diff * 10) / 10 || 0
      return [
        { title: 'Начальный вес', value: user.weight_start + ' кг' },
        {
          title: 'Текущий вес',
          value: `${user.weight_start - weight_diff}${
            weight_diff > 0 ? '(-' + weight_diff + ')' : ''
          } кг`
        },
        {
          title: 'Рост',
          value: user.height + ' см'
        },
        { title: 'Служитe с', value: user.date_signup },
        {
          title: 'Войска',
          value: user.plan_id === 3 ? 'с наставником' : user.plan_name
        }
      ]
    },
    ...mapGetters({
      USER: 'user/GET_USER'
    })
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
