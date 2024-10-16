// Utility for formatting responses
const formatResponse = (data, message = '', error = null) => ({
    success: !error,
    data,
    message,
    error,
});

module.exports = { formatResponse };
