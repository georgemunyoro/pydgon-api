import { Pool, Client } from 'pg';

export function getDatabaseConnection(): Promise<Client> {
    const promise: Promise<Client> = new Promise((resolve, reject) => {
        try {
            const client = new Client();
            client.connect();
            resolve(client);
        } catch (error) {
            reject(error);
        }
    });
    return promise;
}

export function query(databaseConnection: Client, query: string): Promise<any> {
    const promise: Promise<any> = new Promise(async (resolve, reject) => {
        try {
            const res = await databaseConnection.query(query);
            await databaseConnection.end();
            resolve(200);
        } catch (error) {
            reject(error);
        }
    });
    return promise;
}
