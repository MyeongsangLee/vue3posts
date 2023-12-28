<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />

		<PostFilter
			v-model:title="params.title_like"
			v-model:limit="params._limit"
		/>

		<hr class="my-4" />
		<AppLoading v-if="loading" />
		<AppError v-else-if="error" :message="error.message" />

		<template v-else>
			<AppGrid :items="posts">
				<template v-slot="{ item }">
					<Postitem
						:title="item.title"
						:content="item.content"
						:createdAt="item.createdAt"
						@click="goPage(item.id)"
						@modal="openModal(item)"
						@preview="selectPreview(item.id)"
					></Postitem>
				</template>
			</AppGrid>

			<AppPagination
				:current-page="params._page"
				:page-count="pageCount"
				@page="page => (params._page = page)"
			></AppPagination>
		</template>

		<Teleport to="#modal">
			<PostModal
				v-model="show"
				:title="modalTitle"
				:content="modalContent"
				:createdAt="modalCreatedAt"
			/>
		</Teleport>
		<template v-if="previewId">
			<hr class="my-5" />
			<AppCard>
				<PostDetailView :id="previewId" />
			</AppCard>
		</template>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import Postitem from '@/components/posts/PostItem.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';
import { useAxios } from '@/hooks/useAxios';
import { useRouter } from 'vue-router';

const router = useRouter();
const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_page: 1,
	_limit: 3,
	title_like: '',
});

const previewId = ref(null);
const selectPreview = id => {
	previewId.value = id;
};

//pagination
const totalCount = computed(() => response.value.headers['x-total-count']);
const pageCount = computed(() =>
	Math.ceil(totalCount.value / params.value._limit),
);

const {
	response,
	data: posts,
	error,
	loading,
} = useAxios('/posts', { params });

// const fetchPosts = async () => {
// 	try {
// 		loading.value = true;
// 		const { data, headers } = await getPosts(params.value);
// 		posts.value = data;
// 		totalCount.value = headers['x-total-count'];
// 	} catch (err) {
// 		console.error(err);
// 		error.value = err;
// 	} finally {
// 		loading.value = false;
// 	}

// posts.value = getPosts();
// ({ data: posts.value } = await getPosts());

// getPosts()
// 	.then(response => {
// 		console.log('response :', response);
// 		posts.value = response.data;
// 	})
// 	.catch(error => {
// 		console.log('error :', error);
// 	});
//};

// fetchPosts();
// watchEffect(fetchPosts);

const goPage = id => {
	// router.push(`/posts/${id}`);
	router.push({
		name: 'PostDetail',
		params: {
			id,
		},
	});
};

//modal
const show = ref(false);
const modalTitle = ref('');
const modalContent = ref('');
const modalCreatedAt = ref('');
const openModal = ({ title, content, createdAt }) => {
	show.value = true;
	modalTitle.value = title;
	modalContent.value = content;
	modalCreatedAt.value = createdAt;
};
</script>

<style lang="scss" scoped></style>
