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
      class="image-preview"
      v-if="image_preview"
      alt="Image preview"
      :src="image_preview"
    />
    <VCaption class="image-preview__caption" v-if="image_src && image_src.name">
      {{ image_src.name }}
    </VCaption>
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
import VCaption from '../typography/VCaption'
export default {
  components: { VCaption, VButton },
  data() {
    return {
      image_preview: null,
      image_src: null
    }
  },
  methods: {
    handleFile(e) {
      if (e.target.files[0]) {
        this.image_src = e.target.files[0]
        this.createImage(e.target.files[0])
        this.$emit('imageUploaded', this.image_src)
      }
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

<style scoped>
.image-preview {
  max-width: 100%;
  margin: var(--space-half) 0;
  border-radius: var(--radius-half);
}

.image-preview__caption {
  text-align: right;
  margin-bottom: var(--space-half);
}
</style>
