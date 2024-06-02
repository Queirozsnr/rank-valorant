const config = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.kyroskoh.xyz/valorant/v1/:path*', // Use sua URL base
      },
    ]
  },
};

export default config;
