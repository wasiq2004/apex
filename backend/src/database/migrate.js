import mysql from 'mysql2/promise';
import config from '../config/config.js';
import logger from '../config/logger.js';

const migrations = [
    {
        name: 'create_courses_table',
        sql: `
      CREATE TABLE IF NOT EXISTS courses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10, 2) DEFAULT NULL,
        status ENUM('visible', 'hidden') DEFAULT 'visible',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_status (status),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `
    },
    {
        name: 'create_admin_users_table',
        sql: `
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP NULL,
        INDEX idx_username (username)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `
    }
];

const runMigrations = async () => {
    let connection;

    try {
        // Create connection without database selection
        connection = await mysql.createConnection({
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            port: config.database.port
        });

        logger.info('🔄 Starting database migrations...');

        // Create database if it doesn't exist
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${config.database.database}`);
        logger.info(`✅ Database '${config.database.database}' ready`);

        // Use the database
        await connection.query(`USE ${config.database.database}`);

        // Run migrations
        for (const migration of migrations) {
            logger.info(`Running migration: ${migration.name}`);
            await connection.query(migration.sql);
            logger.info(`✅ Migration completed: ${migration.name}`);
        }

        logger.info('✅ All migrations completed successfully');

    } catch (error) {
        logger.error('❌ Migration failed:', error);
        throw error;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};

// Run migrations if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    runMigrations()
        .then(() => {
            logger.info('Migration script completed');
            process.exit(0);
        })
        .catch((error) => {
            logger.error('Migration script failed:', error);
            process.exit(1);
        });
}

export default runMigrations;
