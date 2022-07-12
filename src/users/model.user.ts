import { compareSync, hashSync } from "bcrypt";
import {
    BCRYPT_PASSWORD as pepper,
    SALT_ROUNDS as salt,
} from "../configs/config";

import client from "../configs/database";
import Person from "./type.user";

class User {
    //add new user
    async register(u: Person): Promise<Person> {
        try {
            return client.connect().then(async (db) => {
                const rows = (
                    await db.query(
                        `INSERT INTO users(username, firstname, lastname, password) VALUES($1, $2, $3, $4) 
                            RETURNING *`,
                        [
                            u.username,
                            u.firstname,
                            u.lastname,
                            hashSync(u.password + pepper, parseInt(salt as string)),
                        ]
                    )
                ).rows[0];
                db.release();
                return rows;
            });
        } catch (error) {
            throw error;
        }
    }

    //get list of users
    async getUsers(): Promise<Person[]> {
        try {
            return client.connect().then(async (db) => {
                const rows = (
                    await db.query(`SELECT * FROM users`)
                ).rows;
                db.release();
                return rows;
            });
        } catch (error) {
            throw error;
        }
    }

    //get requested by id
    async showUser(id: string): Promise<Person> {
        try {
            const user = (await this.getUsers()).filter(
                (u) => u.id === parseInt(id)
            )[0];
            return user;
        } catch (error) {
            throw error;
        }
    }

    //Authenticate registered user
    async signIn(username: string, password: string): Promise<Person | null> {
        try {
            return client.connect().then(async (db) => {
                const rows = (
                    await db.query(`SELECT * FROM users WHERE username=($1)`, [username])
                ).rows;
                db.release();
                if (compareSync(password + pepper, rows[0].password)) return rows[0];
                return null;
            });
        } catch (error) {
            throw error;
        }
    }
}

export default User;
