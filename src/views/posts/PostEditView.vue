<template>
	<AppLoading v-if="loading" />
	<AppError v-else-if="error" :message="error.message" />
	<div v-else>
		<h2>게시글 수정</h2>
		<hr class="my-4" />
		<AppError v-if="editError" :message="editError.message" />
		<PostForm
			v-model:title="form.title"
			v-model:content="form.content"
			@submit.prevent="edit"
		>
			<template #actions>
				<button
					type="button"
					class="btn btn-outline-dark"
					@click="goDetailPage"
				>
					취소
				</button>

				<button class="btn btn-primary" :disabled="editLoading">
					<template v-if="editLoading">
						<span
							class="spinner-grow spinner-grow-sm"
							aria-hidden="true"
						></span>
						<span role="status">Loading...</span>
					</template>
					<template v-else>수정</template>
				</button>
			</template>
		</PostForm>

		<!-- <AppAlert :items="alerts"></AppAlert> -->

		<!-- <AppAlert
			:show="showAlert"
			:message="alertMessage"
			:type="alertType"
		></AppAlert> -->
	</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composibles/alert';
import { useAxios } from '@/hooks/useAxios';

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const { vAlert, vSuccess } = useAlert();

const { data: form, error, loading } = useAxios(`/posts/${id}`);

const {
	error: editError,
	loading: editLoading,
	execute,
} = useAxios(
	`/posts/${id}`,
	{ method: 'patch' },
	{
		immediate: false,
		onSuccess: () => {
			router.push({ name: 'PostDetail', params: { id } });
			vSuccess('수정이 완료 되었습니다.');
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const edit = async () => {
	execute({ ...form.value });
	// try {
	// 	editLoading.value = true;
	// 	await updatePost(id, { ...form.value });
	// 	router.push({ name: 'PostDetail', params: { id } });
	// 	vSuccess('수정이 완료 되었습니다.');
	// 	// vAlert('수정이 완료 되었습니다.', 'success');
	// } catch (err) {
	// 	console.error(err);
	// 	vAlert(err.message);
	// 	editError.value = err;
	// } finally {
	// 	editLoading.value = false;
	// }
};

const goDetailPage = () => {
	router.push({
		name: 'PostDetail',
		params: {
			id,
		},
	});
};

//alert
// const showAlert = ref(false);
// const alertMessage = ref('');
// const alertType = ref('');

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
