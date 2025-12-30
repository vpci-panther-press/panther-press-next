import js from "@eslint/js";
import typescript from "typescript-eslint";

export default typescript.config(
	js.configs.recommended,
	...typescript.configs.recommended,
	{
		languageOptions: {
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				jsx: true,
			},
		},
		rules: {
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
				},
			],
		},
	}
);
