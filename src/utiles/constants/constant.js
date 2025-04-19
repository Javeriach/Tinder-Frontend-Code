export let BASE_USL =
  location.hostname === 'localhost'
    ? 'http://localhost:7777'
    : 'https://corsproxy.io/?url=https://tinder-server-2uuv.vercel.app';
