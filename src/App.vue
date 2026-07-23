<script setup>
import CVProfile from './components/CVProfile.vue'
</script>

<template>
  <CVProfile />
</template>

<style>
/* Reset para impresión */
@media print {
  body {
    background: white !important;
    margin: 0 !important;
    padding: 0 !important;
  }
}
</style>