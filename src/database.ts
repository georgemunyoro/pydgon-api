import { Pool, Client } from 'pg';

export function getDatabaseConnection(): Promise {
    const promise = new Promise((resolve, reject) => {
        try {
            const client = new Client();
            client.connect();
            resolve(client);
        } catch (error) {
            reject(error);
        }
    });
}

export function query(databaseConnection: Client, query: String): Promise {
    const promise = new Promise(async (resolve, reject) => {
        try {
            const res = await databaseConnection.query(query);
            await databaseConnection.end();
            resolve(200);
        } catch (error) {
            reject(error);
        }
    });
}
