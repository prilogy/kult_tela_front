<template>
  <div class="profile">
    <div class="profile__top">
      <img :src="USER.avatar_src" alt="Avatar" class="profile__top__avatar" />
      <div class="profile__top__info">
        <VH2>{{ USER.first_name + ' ' + USER.last_name }}</VH2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { VH2 } from '../components/'
export default {
  components: { VH2 },
  computed: {
    ...mapGetters({
      USER: 'auth/GET_USER'
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
