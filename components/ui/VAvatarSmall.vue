<template>
  <div class="box">
    <span
      v-if="mark"
      :style="'--mark-border-color:' + mark.borderColor"
      class="avatar__online-mark"
    ></span>
    <div :style="'--size:' + size" class="wrapper">
      <div class="avatar">
        <img
          @load="resizeAndCenter($refs.image, SIZE)"
          ref="image"
          :style="imgStyle"
          class="avatar__img"
          :src="image_src"
          alt="avatar"
        />
      </div>
    </div>
  </div>
</template>

<script>
import resizeAndCenterImage from '../../mixins/resizeAndCenterImage'
export default {
  mixins: [resizeAndCenterImage],
  props: {
    src: {
      type: String
    },
    size: {
      type: String,
      default: '50px'
    },
    online: {
      type: Boolean,
      default: false
    },
    mark: {
      type: Object
    },
    admin_role_id: Number
  },
  data() {
    return {
      imgStyle: {}
    }
  },
  computed: {
    SIZE() {
      return this.size.replace('px', '')
    },
    image_src() {
      if (!this.src) {
        if (typeof this.admin_role_id === 'number') {
          const role_id = this.admin_role_id
          if (role_id === -1) return '/images/avatars/admin_avatar.png'
          if (role_id === 0) return '/images/avatars/admin_avatar.png'
          if (role_id === 1) return '/images/avatars/diet_avatar.jpg'
          if (role_id === 2) return '/images/avatars/tutor_avatar.jpg'
        } else return '/images/avatars/blank_avatar.png'
      } else return this.src
    }
  }
}
</script>

<style scoped>
.box {
  position: relative;
}
.wrapper {
  width: var(--size);
  height: var(--size);
  overflow: hidden;
  border-radius: 100px;
}
.avatar {
  position: relative;
}
.avatar__img {
  position: absolute;
}

.avatar__online-mark {
  z-index: 10;
  position: absolute;
  display: inline-block;
  --mark-size: calc(var(--size) / 4);
  border-radius: 50%;
  background: var(--green-base);
  height: 11px;
  width: 11px;
  bottom: 0;
  right: 0;
  border: 2px solid var(--mark-border-color);
}
</style>
