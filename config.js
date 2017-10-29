exports.DATABASE_URL = process.env.MONGODB_URI ||
                       global.DATABASE_URL ||
                       "localhost";
exports.PORT = process.env.PORT || 8090;

