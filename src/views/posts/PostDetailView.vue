<template>
	<AppLoading v-if="loading" />
	<AppError v-else-if="error" :message="error.message" />
	<div v-else>
		<h2>{{ post.title }}</h2>
		<p>id: {{ post.id }}, isOdd: {{ isOdd }}</p>
		<p>{{ post.content }}</p>
		<p class="text-muted">
			{{ $dayjs(post.createdAt).format('YYYY. MM. DD HH:mm:ss') }}
		</p>
		<hr class="my-4" />
		<AppError v-if="removeError" :message="removeError.message" />
		<div class="row g-2">
			<div class="col-auto">
				<button class="btn btn-outline-dark">이전글</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-dark">다음글</button>
			</div>
			<div class="col-auto me-auto"></div>
			<div class="col-auto">
				<button class="btn btn-outline-dark" @click="goListPage">목록</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-primary" @click="goEditPage">
					수정
				</button>
			</div>
			<div class="col-auto">
				<button
					class="btn btn-outline-danger"
					@click="remove"
					:disabled="removeLoading"
				>
					<template v-if="removeLoading">
						<span
							class="spinner-grow spinner-grow-sm"
							aria-hidden="true"
						></span>
						<span role="status">Loading...</span>
					</template>
					<template v-else>삭제</template>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAlert } from '@/composibles/alert';
import { useAxios } from '@/hooks/useAxios';
import { computed, toRefs } from 'vue';
import { useNumber } from '@/composibles/number';

const { vAlert, vSuccess } = useAlert();

const props = defineProps({
	id: [String, Number],
});

// const route = useRoute();
const router = useRouter();
// const id = route.params.id;
const url = computed(() => `/posts/${props.id}`);
// const idRef = toRef(props, 'id');
const { id: idRef } = toRefs(props);
const { isOdd } = useNumber(idRef);

const { data: post, error, loading } = useAxios(url);

const {
	error: removeError,
	loading: removeLoading,
	execute,
} = useAxios(
	`/posts/${props.id}`,
	{ method: 'delete' },
	{
		immediate: false,
		onSuccess: () => {
			vSuccess('삭제가 완료되었습니다.');
			router.push({ name: 'PostList' });
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const remove = async () => {
	if (!confirm('삭제 하시겠습니까?')) {
		return;
	}

	execute();
	// try {
	// 	if (confirm('삭제 하시겠습니까?')) {
	// 		removeLoading.value = true;
	// 		await deletePost(props.id);
	// 		vSuccess('삭제가 완료되었습니다.');
	// 		router.push({ name: 'PostList' });
	// 	}
	// } catch (err) {
	// 	console.error(err);
	// 	vAlert(err.message);
	// 	removeError.value = err;
	// } finally {
	// 	removeLoading.value = false;
	// }
};

const goListPage = () => {
	router.push({ name: 'PostList' });
};

const goEditPage = () => {
	router.push({
		name: 'PostEdit',
		params: {
			id: props.id,
		},
	});
};
</script>

<style lang="scss" scoped></style>
