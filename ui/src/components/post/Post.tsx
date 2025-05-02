import { useState } from 'react';
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	IconButton,
	Box,
	Avatar,
	Slide,
} from '@mui/material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface CustomCardProps {
	title: string;
	content: string;
	images: string[];
	username: string;
	profilePic: string;
	timestamp: string;
}

enum VoteType {
	upvote = 1,
	downvote = 2,
}

const Post = ({
	title,
	content,
	images,
	username,
	profilePic,
	timestamp,
}: CustomCardProps) => {
	const [downvotes, setDownvotes] = useState<number>(10);
	const [upvotes, setUpvote] = useState<number>(0);
	const [vote, setVote] = useState<VoteType | null>(null);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [slideDirection, setSlideDirection] = useState<'left' | 'right'>(
		'right'
	);
	const [isSliding, setIsSliding] = useState(true);

	const handleUpdateVote = () => {
		if (vote === VoteType.upvote) {
			setUpvote((prev) => prev - 1);
			setVote(null);
		} else {
			setUpvote((prev) => prev + 1);
			if (vote === VoteType.downvote) setDownvotes(downvotes - 1);
			setVote(VoteType.upvote);
		}
	};

	const handleDownVote = () => {
		if (vote === VoteType.downvote) {
			setDownvotes((prev) => prev - 1);
			setVote(null);
		} else {
			setDownvotes((prev) => prev + 1);
			if (vote === VoteType.upvote) setUpvote((prev) => prev - 1);
			setVote(VoteType.downvote);
		}
	};

	const prevImage = () => {
		setIsSliding(false);
		setTimeout(() => {
			setSlideDirection('right');
			setCurrentImageIndex((prevIndex) =>
				prevIndex === 0 ? images.length - 1 : prevIndex - 1
			);
			setIsSliding(true);
		}, 10);
	};

	const nextImage = () => {
		setIsSliding(false);
		setTimeout(() => {
			setSlideDirection('left');
			setCurrentImageIndex((prevIndex) =>
				prevIndex === images.length - 1 ? 0 : prevIndex + 1
			);
			setIsSliding(true);
		}, 10);
	};

	return (
		<Card
			sx={{
				maxWidth: 650,
				marginTop: '20px',
				boxShadow: 3,
				borderRadius: 2,
				position: 'relative',
			}}>
			{/* Header */}
			<Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
				<Avatar src={profilePic} sx={{ marginRight: 2 }} />
				<Box>
					<Typography variant="body1" fontWeight="bold">
						{username}
					</Typography>
					<Typography variant="caption" color="textSecondary">
						{timestamp}
					</Typography>
				</Box>
			</Box>

			{/* Image Carousel */}
			<Box sx={{ position: 'relative', overflow: 'hidden' }}>
				<Slide
					in={isSliding}
					direction={slideDirection}
					timeout={300}
					key={currentImageIndex}>
					<CardMedia
						component="img"
						height="400"
						image={images[currentImageIndex]}
						alt={title}
						sx={{
							objectFit: 'contain',
							backgroundColor: (theme) =>
								theme.palette.mode === 'dark'
									? theme.palette.grey[900]
									: theme.palette.grey[200],
						}}
					/>
				</Slide>

				{/* Left Arrow */}
				<IconButton
					sx={{
						position: 'absolute',
						top: '50%',
						left: 0,
						transform: 'translateY(-50%)',
						backgroundColor: (theme) =>
							theme.palette.background.paper,
						marginLeft: 2,
					}}
					onClick={prevImage}>
					<ChevronLeft />
				</IconButton>

				{/* Right Arrow */}
				<IconButton
					sx={{
						position: 'absolute',
						top: '50%',
						right: 0,
						transform: 'translateY(-50%)',
						marginRight: 2,
						backgroundColor: (theme) =>
							theme.palette.background.paper,
					}}
					onClick={nextImage}>
					<ChevronRight />
				</IconButton>
			</Box>

			<CardContent>
				<Typography variant="h6" gutterBottom>
					{title}
				</Typography>
				<Typography variant="body2" color="textSecondary">
					{content}
				</Typography>

				{/* Upvote & Downvote */}
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						marginTop: 1,
					}}>
					<IconButton
						onClick={handleUpdateVote}
						color={
							vote === VoteType.upvote ? 'primary' : 'default'
						}>
						<ArrowCircleUpIcon />
					</IconButton>
					<Typography sx={{ mr: 2, minWidth: '20px', textAlign: 'center' }}>{upvotes}</Typography>
					<IconButton
						onClick={handleDownVote}
						color={
							vote === VoteType.downvote ? 'error' : 'default'
						}>
						<ArrowCircleDownIcon />
					</IconButton>
					<Typography sx={{ minWidth: '20px', textAlign: 'center' }}>{downvotes}</Typography>
					<IconButton sx={{ ml: 'auto' }}>
						<ChatBubbleOutlineIcon />
					</IconButton>
					<IconButton>
						<ShareIcon />
					</IconButton>
				</Box>
			</CardContent>
		</Card>
	);
};

export default Post;
