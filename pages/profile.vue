<template>
  <div class="profile" v-if="USER">
    <div class="profile__top">
      <VAvatar :rank="USER.rank" :image_src="USER.avatar_src"></VAvatar>
      <div class="profile__top__info">
        <div>
          <VH2 weight="regular">
            {{ USER.first_name + ' ' + USER.last_name }}
          </VH2>
          <div v-if="info">
            <div class="profile__top__info__item" v-for="item in info">
              <VP>{{ item.title }}</VP>
              <VP>{{ item.value }}</VP>
            </div>
          </div>
        </div>
        <VButton @click="" mt="var(--space-third)" weight="regular" w100>
          Редактировать
        </VButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { VH2, VH3, VP, VAvatar, VButton } from '../components/'
export default {
  components: { VButton, VP, VH3, VAvatar, VH2 },
  computed: {
    info() {
      const user = this.USER
      return [
        { id: 0, title: 'Начальный вес', value: user.weight_start + 'кг' },
        { id: 1, title: 'Сброшено кг', value: (user.weight_diff || 0) + 'кг' },
        { id: 2, title: 'Зарегистрирован(а)', value: user.date_signup }
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

.profile__top__info__item {
  display: flex;
  flex-wrap: wrap;
  line-height: 1.3;
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
