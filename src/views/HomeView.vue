<template>
	<div>
		<h2>Home View</h2>
		<p>{{ $route.path }}</p>
		<p>{{ $route.name }}</p>
		<button class="btn btn-primary" @click="$router.push('/about')">
			About으로 이동
		</button>

		<hr class="my-4" />
		<h2>{{ $person.name }}</h2>
		<button class="btn btn-primary" v-on:click="person.say">
			Click Person
		</button>

		<hr class="my-4" />
		<h2>{{ position }}</h2>
		<h2>x:{{ x }}, y: {{ y }}</h2>
	</div>
</template>

<script>
export default {
	created() {
		// console.log(this.$person.name);
		// this.$person.say();
	},
};
</script>

<script setup>
import { inject, reactive, toRef, toRefs } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const person = inject('person');

console.log('route.path: ', route.params);
console.log('person.name: ', person.name);

const position = reactive({
	x: 100,
	y: 1000,
});

// const x = toRef(position, 'x');
// const y = toRef(position, 'y');

const { x, y } = toRefs(position);
</script>

<style lang="scss" scoped></style>
