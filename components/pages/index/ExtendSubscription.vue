<template>
  <div>
    <VPageHeading level="3">
      Подписка закончилась!
      <template v-slot:info>
        Надеемся этот месяц с нами вам понравился!
        <br />
        Вы можете продолжить службу, продлив подписку.
      </template>
    </VPageHeading>
    <VButton @click="$router.push('/subscription/extend')">
      Продлить подписку
    </VButton>
  </div>
</template>

<script>
export default {
  computed: {
    USER() {
      return this.$store.getters['users/GET_USER']
    }
  }
}
</script>
