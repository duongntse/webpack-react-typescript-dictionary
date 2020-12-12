export interface IGifImage {
	fixed_height: iFixedHeight;
	fixed_height_still: iFixedHeightStill;
	fixed_height_downsampled: ifixedHeightDownsampled;
	fixed_width: iFixedWidth;
	fixed_width_still: iFixedWidthStill;
	fixed_width_downsampled: ifixedWidthDownsampled;
	fixed_height_small: iFixedHeightSmall;
	fixed_height_small_still: iFixedHeightSmallStill;
	fixed_width_small: iFixedWidthSmall;
	fixed_width_small_still: iFixedWidthSmallStill;
	downsized: iDownsized;
	downsized_still: iDownsizedStill;
	downsized_large: iDownsizedLarge;
	downsized_medium: iDownsizedMedium;
	downsized_small: iDownsizedSmall;
	original: iOriginal;
	original_still: iOriginalStill;
	looping: iLooping;
	preview: iPreview;
	preview_gif: iPreviewGif;
}
interface iLooping {
	mp4: string;
}
interface iPreview {
	width: string;
	height: string;
	mp4: string;
	mp4_size: string;
}
interface iPreviewGif extends iFixedHeightStill {}
interface iFixedHeight {
	url: string;
	width: string;
	height: string;
	size: string;
	mp4: string;
	mp4_size: string;
	webp: string;
	webp_size: string;
}
interface iFixedHeightSmall extends iFixedHeight {}
interface iFixedHeightSmallStill extends iFixedHeightStill {}
interface iFixedHeightStill {
	url: string;
	width: string;
	height: string;
}
interface iFixedWidthStill extends iFixedHeightStill {}
interface iOriginalStill extends iFixedHeightStill {}
interface ifixedHeightDownsampled {
	url: string;
	width: string;
	height: string;
	size: string;
	webp: string;
	webp_size: string;
}
interface ifixedWidthDownsampled extends ifixedHeightDownsampled {}
interface iFixedWidth extends iFixedHeight {}
interface iFixedWidthSmall extends iFixedHeight {}
interface iFixedWidthSmallStill extends iFixedHeightStill {}
interface iDownsized extends iFixedHeightStill {
	size: string;
}
interface iDownsizedStill extends iFixedHeightStill {}
interface iDownsizedLarge extends iDownsized {}
interface iDownsizedMedium extends iDownsized {}
interface iDownsizedSmall extends iDownsized, iPreview {}
interface iOriginal extends iFixedHeight {
	width: string;
	height: string;
	size: string;
	mp4: string;
	mp4_size: string;
	webp: string;
	webp_size: string;
	frames: string;
}
