import { createMedia } from '@artsy/fresnel';

const ExampleAppMedia = createMedia({
  breakpoints: {
    zero: 0,
    mobile: 550,
    fullwidth: 738,
    gallerymax: 918,
    widescreen: 1250,
  },
});

// Make styles for injection into the header of the page
export const mediaStyles = ExampleAppMedia.createMediaStyle();

export const { Media, MediaContextProvider } = ExampleAppMedia;
