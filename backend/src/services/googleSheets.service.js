import { google } from 'googleapis';
import config from '../config/config.js';
import logger from '../config/logger.js';

class GoogleSheetsService {
    constructor() {
        this.sheets = null;
        this.auth = null;
        this.initialized = false;
    }

    async initialize() {
        if (this.initialized) return;

        try {
            // Validate configuration
            if (!config.googleSheets.spreadsheetId) {
                throw new Error('Google Sheets Spreadsheet ID not configured');
            }
            if (!config.googleSheets.serviceAccountEmail || !config.googleSheets.privateKey) {
                throw new Error('Google Service Account credentials not configured');
            }

            // Create JWT auth client
            this.auth = new google.auth.JWT({
                email: config.googleSheets.serviceAccountEmail,
                key: config.googleSheets.privateKey,
                scopes: ['https://www.googleapis.com/auth/spreadsheets']
            });

            // Initialize Sheets API
            this.sheets = google.sheets({ version: 'v4', auth: this.auth });
            this.initialized = true;

            logger.info('✅ Google Sheets API initialized successfully');
        } catch (error) {
            logger.error('❌ Failed to initialize Google Sheets API:', error);
            throw error;
        }
    }

    async appendToSheet(sheetName, values) {
        try {
            if (!this.initialized) {
                await this.initialize();
            }

            const response = await this.sheets.spreadsheets.values.append({
                spreadsheetId: config.googleSheets.spreadsheetId,
                range: `${sheetName}!A:Z`,
                valueInputOption: 'USER_ENTERED',
                insertDataOption: 'INSERT_ROWS',
                requestBody: {
                    values: [values]
                }
            });

            logger.info(`✅ Data appended to sheet: ${sheetName}`);
            return response.data;
        } catch (error) {
            logger.error(`❌ Failed to append to sheet ${sheetName}:`, error);
            throw error;
        }
    }

    async submitContactForm(formData) {
        const timestamp = new Date().toISOString();
        const values = [
            timestamp,
            formData.name,
            formData.email,
            formData.phone,
            formData.interest || '',
            formData.message
        ];

        return await this.appendToSheet('Contact_Form_Submissions', values);
    }

    async submitCareerApplication(formData) {
        const timestamp = new Date().toISOString();
        const values = [
            timestamp,
            formData.fullName,
            formData.email,
            formData.phone,
            formData.position,
            formData.resumeLink || 'N/A',
            formData.coverLetter || ''
        ];

        return await this.appendToSheet('Career_Applications', values);
    }

    async ensureSheetsExist() {
        try {
            if (!this.initialized) {
                await this.initialize();
            }

            // Get spreadsheet metadata
            const spreadsheet = await this.sheets.spreadsheets.get({
                spreadsheetId: config.googleSheets.spreadsheetId
            });

            const existingSheets = spreadsheet.data.sheets.map(s => s.properties.title);
            const requiredSheets = ['Contact_Form_Submissions', 'Career_Applications'];
            const sheetsToCreate = requiredSheets.filter(s => !existingSheets.includes(s));

            if (sheetsToCreate.length > 0) {
                const requests = sheetsToCreate.map(title => ({
                    addSheet: {
                        properties: { title }
                    }
                }));

                await this.sheets.spreadsheets.batchUpdate({
                    spreadsheetId: config.googleSheets.spreadsheetId,
                    requestBody: { requests }
                });

                logger.info(`✅ Created sheets: ${sheetsToCreate.join(', ')}`);
            }

            // Add headers if sheets are empty
            for (const sheetName of requiredSheets) {
                const headers = sheetName === 'Contact_Form_Submissions'
                    ? ['Timestamp', 'Name', 'Email', 'Phone', 'Interest', 'Message']
                    : ['Timestamp', 'Full Name', 'Email', 'Phone', 'Position', 'Resume Link', 'Cover Letter'];

                // Check if sheet has data
                const values = await this.sheets.spreadsheets.values.get({
                    spreadsheetId: config.googleSheets.spreadsheetId,
                    range: `${sheetName}!A1:Z1`
                });

                if (!values.data.values || values.data.values.length === 0) {
                    await this.sheets.spreadsheets.values.update({
                        spreadsheetId: config.googleSheets.spreadsheetId,
                        range: `${sheetName}!A1`,
                        valueInputOption: 'USER_ENTERED',
                        requestBody: {
                            values: [headers]
                        }
                    });
                    logger.info(`✅ Added headers to ${sheetName}`);
                }
            }
        } catch (error) {
            logger.error('❌ Failed to ensure sheets exist:', error);
            throw error;
        }
    }
}

export default new GoogleSheetsService();
