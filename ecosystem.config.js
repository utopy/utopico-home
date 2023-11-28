module.exports = {
    apps: [{
        name: "interno.utopico.it",
        script: "./build/server.js",
        cwd: "/var/www/node/interno.utopico.it/current",
        error_file: "/var/www/node/interno.utopico.it/shared/logs/pm2.err.log",
        out_file: "/var/www/node/interno.utopico.it/shared/logs/pm2.web.log",
        instances: 1
    }],
    deploy: {
        production: {
            user: "utopico",
            host: "134.209.225.232",
            repo: "git@github.com:utopy/utopico-interno.git",
            ref: "origin/main",
            path: "/var/www/node/interno.utopico.it",
            fetch: "all",
            // env: {
            //     "NODE_ENV": "production"
            // },
            'post-deploy': [
                "cd /var/www/node/interno.utopico.it/current",
                "npm install",
                // "npm install",
                "npm run build",
                "cp /var/www/node/interno.utopico.it/shared/.env /var/www/node/interno.utopico.it/current/.env",
                "cp .env ./build/.env",
                "node ace migration:run",
                "ln -s /var/www/node/interno.utopico.it/shared/uploads /var/www/node/interno.utopico.it/current/build/resources/uploads",
                "pm2 startOrRestart ecosystem.config.js --env production"
            ].join(" && ")
        }
    }
}
