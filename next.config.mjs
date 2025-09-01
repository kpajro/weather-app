/** @type {import('next').NextConfig} */
const deploy = true
const nextConfig = {
    basePath: "",
    output: "export",
    reactStrictMode: true,
};
if (deploy){
    const nextConfig = {
        basePath: "/weather-app",
        output: "export",
        reactStrictMode: true,
    }; 
}

export default nextConfig;
