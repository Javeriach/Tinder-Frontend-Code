// API base URL.
//   - Set VITE_API_URL in the environment (e.g. Vercel project settings) to
//     point at your deployed backend.
//   - Falls back to localhost in dev and the current hosted backend otherwise.
const fromEnv = import.meta.env.VITE_API_URL;

export let BASE_USL =
  fromEnv ||
  (location.hostname === 'localhost'
    ? 'http://localhost:7777'
    : 'https://tinder-server-2uuv.vercel.app');
