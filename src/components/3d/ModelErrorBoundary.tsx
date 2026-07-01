"use client";

import { Component, ReactNode } from "react";

interface ModelErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ModelErrorBoundaryState {
  hasError: boolean;
}

// Catches WebGL/GLTF load failures on older hardware (no WebGL2, driver issues, etc.)
// so the section shows a static image instead of a blank div.
export default class ModelErrorBoundary extends Component<ModelErrorBoundaryProps, ModelErrorBoundaryState> {
  state: ModelErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("3D model failed to render, falling back to image:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
