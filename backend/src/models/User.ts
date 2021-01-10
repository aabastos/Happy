import { Column, Entity, PrimaryColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Entity('users')
export default class Users {
    @PrimaryColumn('varchar')
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    compareHash(password: string) {
        return bcrypt.compareSync(password, this.password);
    }

    generateToken() {
        return jwt.sign({ email: this.email }, "secret", { expiresIn: '1h' });
    }
}