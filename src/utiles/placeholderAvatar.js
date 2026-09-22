// A generic person-silhouette avatar, embedded as a data URI so it always
// renders - no dependency on a third-party stock-photo site staying up or
// not being blocked by an ad-blocker/privacy extension.
const AVATAR_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" fill="#D1D5DB"/>
  <circle cx="100" cy="78" r="38" fill="#9CA3AF"/>
  <path d="M100 128c-44 0-80 24-80 60v12h160v-12c0-36-36-60-80-60z" fill="#9CA3AF"/>
</svg>
`;

export const DEFAULT_AVATAR = `data:image/svg+xml;utf8,${encodeURIComponent(AVATAR_SVG)}`;
