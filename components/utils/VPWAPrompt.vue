<template>
  <VButton @click="install" mt="var(--space-half)" w100>
    Добавить на рабочий стол</VButton
  >
</template>
<script>
import { VButton } from '../';
let installEvent;
export default {
  components: { VButton },
  data() {
    return {
      showInstallBanner: false
    };
  },
  created() {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      installEvent = e;
      this.showInstallBanner = true;
    });
  },
  methods: {
    install() {
      this.showInstallBanner = false;
      installEvent.prompt();
      installEvent.userChoice.then(() => {
        installEvent = null;
      });
    }
  }
};
</script>
