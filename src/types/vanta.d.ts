declare module "vanta/dist/vanta.net.min" {
  interface VantaNetOptions {
    el: HTMLElement;
    THREE: unknown;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    color?: number;
    backgroundColor?: number;
    points?: number;
    maxDistance?: number;
    spacing?: number;
    showDots?: boolean;
    scale?: number;
    scaleMobile?: number;
    minHeight?: number;
    minWidth?: number;
  }

  const NET: (options: VantaNetOptions) => { destroy: () => void };
  export default NET;
}
