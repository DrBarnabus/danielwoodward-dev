/** @type {import("prettier").Config} */
module.exports = {
  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
};
