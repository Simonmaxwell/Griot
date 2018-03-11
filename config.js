exports.DATABASE_URL = process.env.MONGODB_URI ||
                       global.DATABASE_URL ||
                       "mongodb://localhost/griot-test";
exports.PORT = process.env.PORT || 8090;
exports.secret = process.env.secret;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
