/**
 * HTTP Response Helpers
 * Provides consistent response formatting across all API endpoints
 */

/**
 * Send successful response (200 OK)
 * @param {Object} res - Express response object
 * @param {*} data - Response data
 * @param {string} [message] - Optional success message
 * @returns {Object} Express response
 */
export const success = (res, data, message) => {
	const body = { success: true, data };
	if (message) body.message = message;
	return res.status(200).json(body);
};

/**
 * Send created response (201 Created)
 * @param {Object} res - Express response object
 * @param {*} arg1 - Message string or data object
 * @param {*} arg2 - Data object if arg1 is message
 * @returns {Object} Express response
 */
export const created = (res, arg1, arg2) => {
	const message = typeof arg1 === 'string' && arg2 !== undefined ? arg1 : arg2;
	const data = typeof arg1 === 'string' && arg2 !== undefined ? arg2 : arg1;
	return res.status(201).json({ success: true, message, data });
};

/**
 * Error response helpers for different HTTP status codes
 */
export const error = (res, message = 'Bad request') => res.status(400).json({ success: false, message });
export const unauthorized = (res, message = 'Unauthorized') => res.status(401).json({ success: false, message });
export const forbidden = (res, message = 'Forbidden') => res.status(403).json({ success: false, message });
export const notFound = (res, message = 'Resource not found') => res.status(404).json({ success: false, message });
export const conflict = (res, message = 'Conflict') => res.status(409).json({ success: false, message });
export const serverError = (res, message = 'Internal server error') => res.status(500).json({ success: false, message });

// Legacy aliases used across routes
export const ok = (res, data, message) => success(res, data ?? null, message);
export const badRequest = error;
