<script setup>
import TheHeader from '@/layouts/TheHeader.vue';
import TheView from '@/layouts/TheView.vue';
import { useAlert } from '@/composibles/alert';
const { alerts } = useAlert();
</script>

<template>
	<TheHeader></TheHeader>
	<TheView></TheView>
	<AppAlert :items="alerts"></AppAlert>
</template>

<style></style>
