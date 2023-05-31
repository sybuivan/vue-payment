<template>
  <section class="container">
    <section class="menu">
      <headers />
    </section>
    <div class="content-overlay"></div>
    <div class="content-container">
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
import headers from '../components/header.vue';

export default {
  components: {
    headers,
  },
};
</script>
