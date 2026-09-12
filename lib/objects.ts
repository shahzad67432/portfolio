/**
 * Every image object that can rest on the desk, with the alt text it must carry.
 * Assets live in public/objects and are captured from the real thing: the Cetus
 * screenshots come from the live product, the paper thumbnail from the accepted
 * manuscript.
 */
export type DeskAsset = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const deskAssets = {
  cetusPolaroid: {
    id: "cetusPolaroid",
    src: "/objects/cetus-polaroid.jpg",
    alt: "The Cetus composer, dark cinematic hero with a prompt field, captured from the live site",
    width: 880,
    height: 1100,
  },
  cetusDesktop: {
    id: "cetusDesktop",
    src: "/objects/cetus-desktop.jpg",
    alt: "Cetus on a desktop viewport, showing the model row under the composer",
    width: 1440,
    height: 900,
  },
  cetusMobile: {
    id: "cetusMobile",
    src: "/objects/cetus-mobile.jpg",
    alt: "Cetus at phone width",
    width: 390,
    height: 844,
  },
  paperPage: {
    id: "paperPage",
    src: "/objects/paper-page1.jpg",
    alt: "First page of the accepted A-HQCA manuscript",
    width: 760,
    height: 983,
  },
} satisfies Record<string, DeskAsset>;
