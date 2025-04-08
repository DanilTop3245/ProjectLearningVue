<template>
  <div class="dialog" v-if="show" @click.stop="hideDialog">
    <div @click.stop class="dialog_content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import toggleMixin from '@/mixins/toggleMixin';
export default {
  name: "my-dialog",
  mixins: [toggleMixin],
};
</script>
<style scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
}

.dialog_content {
  background: white;
  margin: auto;
  padding: 20px;
  border-radius: 12px;
  min-width: 300px;
  min-height: 50px;
  padding: 20px;
}
</style>
