import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		// devSourcemap: true,
	},
	server: {
		// host: "localhost",
		port: 3000,
	},
	// resolve: {
	// 	alias: {
	// 		"~": path.resolve(__dirname, "./src"),
	// 	},
	// },
});
