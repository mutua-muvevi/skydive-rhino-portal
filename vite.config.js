import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 5500,
	},
	esbuild: {
		jsxFactory: "h",
		jsxFragment: "Fragment",
		loader: "jsx",
		include: /src\/.*\.jsx?$/,
		exclude: [],
	},
	optimizeDeps: {
		force: true,
		esbuildOptions: {
			loader: {
				".js": "jsx",
			},
		},
	},
});
