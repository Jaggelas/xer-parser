import type { BuildConfig } from 'bun';
import dts from 'bun-plugin-dts';

const defaultBuildConfig: BuildConfig = {
	entrypoints: ['./src/index.ts'],
	outdir: './dist'
};

// Always build ESM + types
await Bun.build({
	...defaultBuildConfig,
	plugins: [dts()],
	format: 'esm',
	naming: '[dir]/[name].js'
});

// Try to build CJS when supported by Bun (not yet on Windows as of Bun 1.1.x)
try {
	await Bun.build({
		...defaultBuildConfig,
		format: 'cjs',
		naming: '[dir]/[name].cjs'
	});
} catch (err) {
	console.warn('Skipping CJS build (not supported by this Bun/platform):', (err as Error)?.message ?? err);
}
