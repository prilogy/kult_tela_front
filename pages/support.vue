<template>
  <div>
    <VPageHeading>
      Техническая помощь
    </VPageHeading>
    <VButton @click="goToAdmin" w100>Связаться с администратором</VButton>
  </div>
</template>

<script>
export default {
  methods: {
    async goToAdmin() {
      const { data } = await this.$api.Support.getAdminId()
      if (data && data.id) {
        this.$router.push('/messages/' + data.id)
      }
    }
  }
}
</script>
