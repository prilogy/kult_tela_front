<template>
  <div class="profile" v-if="USER">
    <div class="profile__top">
      <VAvatar :rank="USER.rank" :image_src="USER.avatar_src"></VAvatar>
      <div class="profile__top__info">
        <VH2>{{ USER.first_name + ' ' + USER.last_name }}</VH2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { VH2, VAvatar } from '../components/'
export default {
  components: { VAvatar, VH2 },
  computed: {
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

.profile__top__avatar {
  vertical-align: middle;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 3px solid var(--yellow-base);
}

.profile__top__info {
  margin-left: var(--space);
}
</style>
