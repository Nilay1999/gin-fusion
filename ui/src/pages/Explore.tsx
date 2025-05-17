import apiClient from '@api/client';
import Post from '@components/post/Post';
import { useEffect, useState } from 'react';

interface Post {
	title: string;
	images: string[];
	body: string;
	user: {
		username: string;
		id: number;
	};
	id: number;
	createAt: string;
	updatedAt: string;
	deletedAt: string;
	votes?: any;
}

const ExplorePage = () => {
	const [posts, setPosts] = useState<Post[]>();
	useEffect(() => {
		const getPosts = async () => {
			try {
				const { data } = await apiClient.getPaginatedPosts({
					headers: {
						Authorization: `${localStorage.getItem('token')}`,
					},
				});
				setPosts(data);
			} catch (error) {
				console.log(error);
			}
		};
		getPosts();
	}, []);

	return (
		<>
			{posts?.map((post) => (
				<Post
					key={post.id}
					username={post.user.username}
					profilePic="https://styles.redditmedia.com/t5_3l2acu/styles/communityIcon_fikepkqubqje1.png"
					timestamp={post.createAt}
					title={post.title}
					content={post.body}
					images={post.images}
				/>
			))}
		</>
	);
};

export default ExplorePage;
