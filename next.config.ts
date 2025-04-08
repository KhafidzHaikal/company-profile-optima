/* eslint-disable @typescript-eslint/no-require-imports */
// next.config.js
const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withNextIntl(nextConfig);