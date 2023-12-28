<template>
	<div>
		<h2>게시글 등록</h2>
		<hr class="my-4" />
		<AppError v-if="error" :message="error.message" />

		<PostForm
			v-model:title="form.title"
			v-model:content="form.content"
			@submit.prevent="save"
		>
			<template #actions>
				<button type="button" class="btn btn-outline-dark" @click="goListPage">
					목록
				</button>
				<button class="btn btn-primary" :disabled="loading">
					<template v-if="loading">
						<span
							class="spinner-grow spinner-grow-sm"
							aria-hidden="true"
						></span>
						<span role="status">Loading...</span>
					</template>
					<template v-else>저장</template>
				</button>
			</template>
		</PostForm>
		<!-- <AppAlert :items="alerts"></AppAlert> -->
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composibles/alert';
import { useAxios } from '@/hooks/useAxios';

const router = useRouter();
const form = ref({
	title: null,
	content: null,
});

const { vAlert, vSuccess } = useAlert();

const { error, loading, execute } = useAxios(
	'/posts/',
	{
		method: 'post',
		// data: { ...form.value, createdAt: Date.now() },
	},
	{
		immediate: false,
		onSuccess: () => {
			router.push({ name: 'PostList' });
			vSuccess('등록이 완료 되었습니다.');
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);
const save = async () => {
	console.log('save');
	execute({ ...form.value, createdAt: Date.now() });
};
// const save = async () => {
// 	try {
// 		loading.value = true;
// 		await createPost({
// 			...form.value,
// 			createdAt: Date.now(),
// 		});

// 		vSuccess('등록이 완료 되었습니다.');
// 		// vAlert('등록이 완료 되었습니다.', 'success');
// 		router.push({ name: 'PostList' });
// 	} catch (err) {
// 		console.error(err);
// 		error.value = error;
// 		vAlert(err.message);
// 	} finally {
// 		loading.value = false;
// 	}
// };

const goListPage = () => {
	router.push({ name: 'PostList' });
};

// const alerts = ref([]);

// const vAlert = (message, type = 'error') => {
// 	alerts.value.push({ message, type });
// 	// showAlert.value = true;
// 	// alertMessage.value = message;
// 	// alertType.value = type;

// 	setTimeout(() => {
// 		// showAlert.value = false;
// 		alerts.value.shift();
// 	}, 2000);
// };

// const vSuccess = message => vAlert(message, 'success');
</script>

<style lang="scss" scoped></style>
