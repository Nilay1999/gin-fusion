import Post from '@components/post/Post';
import { Typography } from '@mui/material';
import data from './data';

const images = data;

function splitIntoThree(arr: string[]) {
	const chunkSize = Math.ceil(arr.length / 3);
	const first = arr.slice(0, chunkSize);
	const second = arr.slice(chunkSize, chunkSize * 2);
	const third = arr.slice(chunkSize * 2);
	return [first, second, third];
}

const [a, b, c] = splitIntoThree(images);

const ExplorePage = () => {
	return (
		<>
			<Post
				username="Nilay199"
				profilePic="https://styles.redditmedia.com/t5_3l2acu/styles/communityIcon_fikepkqubqje1.png"
				timestamp="3 hrs ago"
				title="Unlocking the Power of Simplicity"
				content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam."
				images={a}
			/>
			<Post
				timestamp="2 hrs ago"
				username="Nilay1999"
				profilePic="https://styles.redditmedia.com/t5_3l2acu/styles/communityIcon_fikepkqubqje1.png"
				title="The Future of Design Systems"
				content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum."
				images={b}
			/>
			<Post
				timestamp="6 hrs ago"
				username="Nilay1999"
				profilePic="https://styles.redditmedia.com/t5_3l2acu/styles/communityIcon_fikepkqubqje1.png"
				title="Building Community Through Creativity"
				content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor."
				images={c}
			/>
		</>
	);
};

export default ExplorePage;
