declare namespace JSX {
  interface IntrinsicElements {
    'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      url?: string;
      loading?: 'eager' | 'lazy';
      'mouse-events'?: 'global' | 'local';
      style?: React.CSSProperties;
    };
  }
} 