<template>
  <div
    @click="goToUser"
    class="item"
    :style="
      '--current-color: ' + (currentAttrs ? currentAttrs.color : '#A2A2A2')
    "
  >
    <div class="item__left">
      <div>
        <VH2>#{{ place }}</VH2>
        <VP>-{{ Math.round(user.weight_diff) }}кг</VP>
      </div>
    </div>
    <div class="item__right">
      <VAvatar
        :style="{
          boxShadow: currentAttrs
            ? '0 0 40px ' + currentAttrs.color + '44'
            : null
        }"
        :image_src="user.avatar_src"
        :rank="user.rank"
      ></VAvatar>
      <VP class="item__right__name">
        {{ user.last_name + ' ' + user.first_name }}
      </VP>
    </div>
  </div>
</template>

<script>
  import VAvatar from '../../ui/VAvatar'

  export default {
    props: {
      user: Object,
      place: Number
    },
    methods: {
      goToUser() {
        this.$router.push('/user/' + this.user.id)
      }
    },
    components: { VAvatar },
    computed: {
      currentAttrs() {
        const attrs = {
          1: {
            color: '#eff621'
          },
          2: {
            color: '#d9d9d9'
          },
          3: {
            color: '#cd7f32'
          }
        }

        return attrs[this.place]
      }
    }
  }
</script>

<style scoped>
  .item__right__name {
    width: min-content !important;
  }

  .item {
    margin-left: -25px;
    width: min-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  }

  .item__left > div {
    margin-bottom: 20px;
    margin-right: 5px;
    text-align: center;
  }

  .item__left p {
    color: var(--current-color);
  }

  .item__left h2 {
    color: var(--current-color);
  }

  .item .avatar__new {
    border: 2px solid var(--current-color);
  }

  .item:hover >>> .avatar__new {
    box-shadow: 0 0 50px var(--current-color) !important;
  }

  .item__right {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .item__right p {
    margin-top: var(--space-third);
    margin-bottom: var(--space-third);
    text-align: center;
    width: fit-content;
    color: var(--current-color);
  }
</style>
