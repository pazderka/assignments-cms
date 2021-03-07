<template>
  <VCard class="ma-5">
    <VCardTitle>{{ title }}</VCardTitle>
    <VCardSubtitle>{{ subtitle }}</VCardSubtitle>
    <slot />
  </VCard>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => "",
    },
    subtitle: {
      type: String,
      default: () => "",
    },
  },
};
</script>
