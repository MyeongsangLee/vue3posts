<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<div class="row">
			<div class="col-4" v-for="post in posts" :key="post.id">
				<Postitem
					:title="post.title"
					:content="post.content"
					:createdAt="post.createdAt"
					@click="goPage(post.id)"
				></Postitem>
			</div>
		</div>
		<hr class="my-4" />
		<AppCard>
			<PostDetailView :id="1"></PostDetailView>
		</AppCard>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import Postitem from '@/components/posts/PostItem.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import AppCard from '@/components/AppCard.vue';
import { getPosts } from '@/api/posts.js';
import { useRouter } from 'vue-router';

const router = useRouter();

const posts = ref([]);

const fetchPosts = () => {
	posts.value = getPosts();
};

fetchPosts();

const goPage = id => {
	// router.push(`/posts/${id}`);
	router.push({
		name: 'PostDetail',
		params: {
			id,
		},
	});
};
</script>

<style lang="scss" scoped></style>
