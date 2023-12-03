module.exports = {
    apps: [{
        name: "expens.app",
        script: "./build/server.js",
        cwd: "/var/www/node/expens.app/current",
        error_file: "/var/www/node/expens.app/shared/logs/pm2.err.log",
        out_file: "/var/www/node/expens.app/shared/logs/pm2.web.log",
        instances: 1
    }],
    deploy: {
        production: {
            user: "utopico",
            host: "134.209.225.232",
            repo: "git@github.com:utopy/utopico-home.git",
            ref: "origin/main",
            path: "/var/www/node/expens.app",
            fetch: "all",
            // env: {
            //     "NODE_ENV": "production"
            // },
            'post-deploy': [
                "cd /var/www/node/expens.app/current",
                "npm install",
                // "npm install",
                "npm run build",
                "cp /var/www/node/expens.app/shared/.env /var/www/node/expens.app/current/.env",
                "cp .env ./build/.env",
                "node ace migration:run",
                "ln -s /var/www/node/expens.app/shared/uploads /var/www/node/expens.app/current/build/resources/uploads",
                "pm2 startOrRestart ecosystem.config.js --env production"
            ].join(" && ")
        }
    }
}
