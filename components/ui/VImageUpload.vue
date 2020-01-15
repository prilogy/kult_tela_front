<template>
  <div>
    <input
      accept="image/*"
      required
      ref="avatarInput"
      style="display: none;"
      type="file"
      @change="handleFile"
    />
    <img
      class="image_preview"
      v-if="image_preview"
      alt="Image preview"
      :src="image_preview"
    />
    <VButton @click="$refs.avatarInput.click()">
      {{
        !$slots.default
          ? !image_src
            ? 'Загрузить фото'
            : 'Загрузить другое фото'
          : ''
      }}
      <slot></slot>
    </VButton>
  </div>
</template>

<script>
import VButton from './VButton'
export default {
  components: { VButton },
  data() {
    return {
      image_preview: null,
      image_src: null
    }
  },
  methods: {
    handleFile(e) {
      this.image_src = e.target.files[0]
      this.createImage(e.target.files[0])
      this.$emit('imageUploaded', this.image_src)
    },
    createImage(file) {
      let image = new Image()
      const reader = new FileReader()
      let vm = this

      reader.onload = e => {
        vm.image_preview = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>

<style>
.image_preview {
  max-width: 100%;
  margin: var(--space-half) 0;
  border-radius: var(--radius-half);
}
</style>
