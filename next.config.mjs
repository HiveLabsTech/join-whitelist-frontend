/** @type {import('next').NextConfig} */
const nextConfig = {
    // async rewrites() {
	// 	return [
	// 		{
	// 			source: '/api/:path*', // 匹配 /api/* 的请求
	// 			destination: "http://127.0.0.1:5000/api/:path*" // 将请求代理到http://127.0.0.1:5000/*
	// 		}
	// 	];
	// }
};

export default nextConfig;
