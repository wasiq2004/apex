import { query } from '../database/connection.js';
import logger from '../config/logger.js';

class CourseService {
    async getAllCourses(includeHidden = false) {
        try {
            const sql = includeHidden
                ? 'SELECT * FROM courses ORDER BY created_at DESC'
                : 'SELECT * FROM courses WHERE status = ? ORDER BY created_at DESC';

            const params = includeHidden ? [] : ['visible'];
            const courses = await query(sql, params);

            return courses;
        } catch (error) {
            logger.error('Error fetching courses:', error);
            throw error;
        }
    }

    async getCourseById(id) {
        try {
            const sql = 'SELECT * FROM courses WHERE id = ?';
            const courses = await query(sql, [id]);

            return courses[0] || null;
        } catch (error) {
            logger.error('Error fetching course by ID:', error);
            throw error;
        }
    }

    async createCourse(courseData) {
        try {
            const { title, description, price, status } = courseData;

            const sql = `
        INSERT INTO courses (title, description, price, status)
        VALUES (?, ?, ?, ?)
      `;

            const result = await query(sql, [
                title,
                description,
                price || null,
                status || 'visible'
            ]);

            logger.info(`✅ Course created with ID: ${result.insertId}`);
            return await this.getCourseById(result.insertId);
        } catch (error) {
            logger.error('Error creating course:', error);
            throw error;
        }
    }

    async updateCourse(id, courseData) {
        try {
            const { title, description, price, status } = courseData;

            const sql = `
        UPDATE courses
        SET title = ?, description = ?, price = ?, status = ?
        WHERE id = ?
      `;

            await query(sql, [
                title,
                description,
                price || null,
                status || 'visible',
                id
            ]);

            logger.info(`✅ Course updated: ${id}`);
            return await this.getCourseById(id);
        } catch (error) {
            logger.error('Error updating course:', error);
            throw error;
        }
    }

    async deleteCourse(id) {
        try {
            const sql = 'DELETE FROM courses WHERE id = ?';
            await query(sql, [id]);

            logger.info(`✅ Course deleted: ${id}`);
            return { success: true };
        } catch (error) {
            logger.error('Error deleting course:', error);
            throw error;
        }
    }

    async toggleCourseVisibility(id) {
        try {
            const course = await this.getCourseById(id);
            if (!course) {
                throw new Error('Course not found');
            }

            const newStatus = course.status === 'visible' ? 'hidden' : 'visible';
            const sql = 'UPDATE courses SET status = ? WHERE id = ?';
            await query(sql, [newStatus, id]);

            logger.info(`✅ Course visibility toggled: ${id} -> ${newStatus}`);
            return await this.getCourseById(id);
        } catch (error) {
            logger.error('Error toggling course visibility:', error);
            throw error;
        }
    }
}

export default new CourseService();
