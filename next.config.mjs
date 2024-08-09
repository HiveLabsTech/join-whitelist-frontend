/** @type {import('next').NextConfig} */

const doMain = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_DEV_PROXY_BASEURL : process.env.NEXT_PUBLIC_PRO_PROXY_BASEURL


const nextConfig = {
    async rewrites() {
		return [
			{
				source: '/api/:path*', // 匹配 /api/* 的请求
				destination: doMain // 请求代理
			}
		];
	}
};

export default nextConfig;
