import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
	...nextVitals,
	...nextTs,
	{
		rules: {
			"@typescript-eslint/consistent-type-imports": [
				"warn",
				{ prefer: "type-imports", fixStyle: "inline-type-imports" },
			],
			"no-restricted-imports": [
				"error",
				{
					patterns: [
						{
							group: ["@/shared/ui/*"],
							message:
								"Import shared UI from '@/shared/ui' barrel to keep import hygiene consistent.",
						},
					],
				},
			],
			complexity: ["warn", 120],
			"max-lines-per-function": [
				"warn",
				{ max: 800, skipBlankLines: true, skipComments: true },
			],
		},
	},
	globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
