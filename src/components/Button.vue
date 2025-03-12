<script setup>

defineProps({
    msg: String,
    to: String 

});
</script>

<template>
<router-link :to="to" class="nav-button">
    {{ msg || "Cliquez ici" }}
  </router-link>
</template>