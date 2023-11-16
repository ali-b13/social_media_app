/** @type {import('next').NextConfig} */
const nextConfig = {
   async rewrites() {
    return [
      {
        source: '/',
        destination: '/main',
      },
    ];
  },
    images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname:"/*/*"
       
      },
      {
        protocol:"https",
        hostname:"res.cloudinary.com",
        pathname:"/*/*"
      },
      
     
    ],
    domains:["lh3.googleusercontent.com","res.cloudinary.com",'"res.cloudinary.com']
    
  },
}

module.exports = nextConfig
