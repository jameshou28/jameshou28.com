// Models shown directly on the /engineering project cards.
export const MODEL_ASSETS = ["/models/vex.glb", "/models/qpin.glb"];

// Homepage hero/about media plus the cover images shown on the
// /programming project cards. Gallery-only images/videos (opened via the
// "View Gallery" modal) are intentionally excluded so they load lazily
// instead of gating the initial loading screen.
export const MEDIA_ASSETS = [
  "/images/profile.jpg",
  "/images/webAble/main.png",
  "/images/QPinConnect/ex1.jpg",
  "/images/qpinWeb/ss1.png",
];

export const PORTFOLIO_ASSETS = [...MODEL_ASSETS, ...MEDIA_ASSETS];
