/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="@emotion/react/types/css-prop" />

// eslint-disable-next-line react/no-typos
import 'react';

declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    loading?: 'auto' | 'eager' | 'lazy';
  }
}
