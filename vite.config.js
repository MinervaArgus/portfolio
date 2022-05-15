import { defineConfig } from "vite";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default defineConfig({
    base: '/portfolio/',
    plugins: [OrbitControls()]
})