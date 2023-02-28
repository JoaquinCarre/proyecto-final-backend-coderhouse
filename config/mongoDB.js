import 'dotenv/config.js';

export default {
    mongoDB: {
        URI: `mongodb+srv://joacarre21:${process.env.MONGO_PASS}@cluster0.del2hb6.mongodb.net/eccomerce?retryWrites=true&w=majority`
    },
}