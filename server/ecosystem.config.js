module.exports = {
  apps: [
    {
      name: "vibar",
      script: "server.js",
      instances: 1, // можно поставить 0 для автоматического выбора
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "development",
        PORT: 5000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 5000,
        HOST: '0.0.0.0'
      },
    },
  ],
};
