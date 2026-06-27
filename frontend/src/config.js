// Dynamic API endpoint configuration
// If VITE_API_URL is set in environment, it uses that absolute path.
// Otherwise, it defaults to relative paths (works for single-server Node deployments).
export const API_URL = import.meta.env.VITE_API_URL || '';
