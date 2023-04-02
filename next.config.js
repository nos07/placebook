/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		appDir: true,
		typedRoutes: true,
		fontLoaders: [
			{
				loader: '@next/font/google',
				options: { subsets: ['latin'] },
			},
		],
	},
	images: {
		domains: ['placebookk.s3.ap-southeast-1.amazonaws.com'],
	},
};

module.exports = nextConfig;
