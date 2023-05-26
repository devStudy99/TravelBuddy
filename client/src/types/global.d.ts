declare module '*.png';
declare module '*.jpg';
declare module '*.svg';

declare module '*.css' {
  const content: { [className: string]: string };
  export = content;
}