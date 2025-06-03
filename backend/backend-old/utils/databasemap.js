const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Replace with your Mongo URI

async function getFieldTypes(documents) {
    const fieldTypes = {};

    documents.forEach(doc => {
        for (const [key, value] of Object.entries(doc)) {
            const type = value === null ? 'null' : Array.isArray(value) ? 'array' : typeof value;
            if (!fieldTypes[key]) fieldTypes[key] = new Set();
            fieldTypes[key].add(type);
        }
    });

    // Convert sets to arrays
    const result = {};
    for (const [key, types] of Object.entries(fieldTypes)) {
        result[key] = Array.from(types);
    }

    return result;
}

async function mapSchemas() {
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        await client.connect();
        console.log(`Connected to MongoDB at ${uri}`);

        const adminDb = client.db().admin();
        const { databases } = await adminDb.listDatabases();

        for (const { name: dbName } of databases) {
            // Skip system databases if you want
            if (['config', 'local', 'admin'].includes(dbName)) continue;

            console.log(`\n=== Database: ${dbName} ===`);
            const db = client.db(dbName);
            const collections = await db.listCollections().toArray();

            for (const { name: collectionName } of collections) {
                console.log(`\n--- Collection: ${collectionName} ---`);
                const collection = db.collection(collectionName);
                const sampleDocs = await collection.find({}).limit(10).toArray();

                if (sampleDocs.length === 0) {
                    console.log('No documents found.');
                    continue;
                }

                const schema = await getFieldTypes(sampleDocs);
                for (const [field, types] of Object.entries(schema)) {
                    console.log(`${field}: ${types.join(' | ')}`);
                }
            }
        }

    } catch (err) {
        console.error('Error mapping schemas:', err);
    } finally {
        await client.close();
        console.log('\nDisconnected from MongoDB');
    }
}

mapSchemas();
