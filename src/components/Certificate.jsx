import React, { useState } from "react"
import { Modal, IconButton, Box, Fade, Backdrop, Zoom, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import FullscreenIcon from "@mui/icons-material/Fullscreen"

const Certificate = ({ ImgSertif }) => {
	const [open, setOpen] = useState(false)
	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	// Handle both single image and array of images
	const images = Array.isArray(ImgSertif) ? ImgSertif : [ImgSertif]
	const currentImage = images[currentImageIndex]

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
		setCurrentImageIndex(0) // Reset to first image when closing
	}

	const handleNextImage = () => {
		setCurrentImageIndex((prev) => (prev + 1) % images.length)
	}

	const handlePrevImage = () => {
		setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
	}

	return (
		<Box component="div" sx={{ width: "100%" }}>
			{/* Thumbnail Container */}
			<Box
				className=""
				sx={{
					position: "relative",
					overflow: "hidden",
					borderRadius: 2,
					boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
					transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
					"&:hover": {
						transform: "translateY(-5px)",
						boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
						"& .overlay": {
							opacity: 1,
						},
						"& .hover-content": {
							transform: "translate(-50%, -50%)",
							opacity: 1,
						},
						"& .certificate-image": {
							filter: "contrast(1.05) brightness(1) saturate(1.1)",
						},
					},
				}}>
				{/* Certificate Image with Initial Filter */}
				<Box
					sx={{
						position: "relative",
						"&::before": {
							content: '""',
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundColor: "rgba(0, 0, 0, 0.1)",
							zIndex: 1,
						},
					}}>
					<img
						className="certificate-image"
						src={currentImage}
						alt="Certificate"
						style={{
							width: "100%",
							height: "200px",
							display: "block",
							objectFit: "cover",
							filter: "contrast(1.10) brightness(0.9) saturate(1.1)",
							transition: "filter 0.3s ease",
						}}
						onClick={handleOpen}
					/>
					{/* Image counter for multiple images */}
					{images.length > 1 && (
						<Box
							sx={{
								position: "absolute",
								top: 8,
								right: 8,
								backgroundColor: "rgba(0, 0, 0, 0.7)",
								color: "white",
								padding: "4px 8px",
								borderRadius: "12px",
								fontSize: "12px",
								fontWeight: "bold",
								zIndex: 3,
							}}
						>
							{currentImageIndex + 1} / {images.length}
						</Box>
					)}
				</Box>

				{/* Hover Overlay */}
				<Box
					className="overlay"
					sx={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						opacity: 0,
						transition: "all 0.3s ease",
						cursor: "pointer",
						zIndex: 2,
					}}
					onClick={handleOpen}>
					{/* Hover Content */}
					<Box
						className="hover-content"
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -60%)",
							opacity: 0,
							transition: "all 0.4s ease",
							textAlign: "center",
							width: "100%",
							color: "white",
						}}>
						<FullscreenIcon
							sx={{
								fontSize: 40,
								mb: 1,
								filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
							}}
						/>
						<Typography
							variant="h6"
							sx={{
								fontWeight: 600,
								textShadow: "0 2px 4px rgba(0,0,0,0.3)",
							}}>
							View Certificate
						</Typography>
					</Box>
				</Box>
			</Box>

			{/* Modal */}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 300,
					sx: {
						backgroundColor: "rgba(0, 0, 0, 0.9)",
						backdropFilter: "blur(5px)",
					},
				}}
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					margin: 0,
					padding: 0,
					"& .MuiBackdrop-root": {
						backgroundColor: "rgba(0, 0, 0, 0.9)",
					},
				}}>
				<Box
					sx={{
						position: "relative",
						width: "auto",
						maxWidth: "90vw",
						maxHeight: "90vh",
						m: 0,
						p: 0,
						outline: "none",
						"&:focus": {
							outline: "none",
						},
					}}>
					{/* Close Button */}
					<IconButton
						onClick={handleClose}
						sx={{
							position: "absolute",
							right: 16,
							top: 16,
							color: "white",
							bgcolor: "rgba(0,0,0,0.6)",
							zIndex: 1,
							padding: 1,
							"&:hover": {
								bgcolor: "rgba(0,0,0,0.8)",
								transform: "scale(1.1)",
							},
						}}
						size="large">
						<CloseIcon sx={{ fontSize: 24 }} />
					</IconButton>

					{/* Navigation buttons for multiple images */}
					{images.length > 1 && (
						<>
							<IconButton
								onClick={handlePrevImage}
								sx={{
									position: "absolute",
									left: 16,
									top: "50%",
									transform: "translateY(-50%)",
									color: "white",
									bgcolor: "rgba(0,0,0,0.6)",
									zIndex: 1,
									padding: 1,
									"&:hover": {
										bgcolor: "rgba(0,0,0,0.8)",
										transform: "translateY(-50%) scale(1.1)",
									},
								}}
								size="large"
							>
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<polyline points="15,18 9,12 15,6"></polyline>
								</svg>
							</IconButton>
							<IconButton
								onClick={handleNextImage}
								sx={{
									position: "absolute",
									right: 16,
									top: "50%",
									transform: "translateY(-50%)",
									color: "white",
									bgcolor: "rgba(0,0,0,0.6)",
									zIndex: 1,
									padding: 1,
									"&:hover": {
										bgcolor: "rgba(0,0,0,0.8)",
										transform: "translateY(-50%) scale(1.1)",
									},
								}}
								size="large"
							>
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<polyline points="9,18 15,12 9,6"></polyline>
								</svg>
							</IconButton>
						</>
					)}

					{/* Modal Image */}
					<img
						src={currentImage}
						alt="Certificate Full View"
						style={{
							display: "block",
							maxWidth: "100%",
							maxHeight: "90vh",
							margin: "0 auto",
							objectFit: "contain",
						}}
					/>

					{/* Image counter in modal */}
					{images.length > 1 && (
						<Box
							sx={{
								position: "absolute",
								bottom: 16,
								left: "50%",
								transform: "translateX(-50%)",
								backgroundColor: "rgba(0, 0, 0, 0.7)",
								color: "white",
								padding: "8px 16px",
								borderRadius: "20px",
								fontSize: "14px",
								fontWeight: "bold",
								zIndex: 1,
							}}
						>
							{currentImageIndex + 1} / {images.length}
						</Box>
					)}
				</Box>
			</Modal>
		</Box>
	)
}

export default Certificate
