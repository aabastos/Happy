import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import UserView from '../views/users_view';

import * as Yup from 'yup';
import * as bcrypt from 'bcrypt';

export default {
    async index(request: Request, response: Response) {
        try {
            const userRepository = getRepository(User);

            const users = await userRepository.find({});

            return response.json(UserView.renderMany(users));
        } catch (err) {
            return response.status(404).json({ message: 'Erro ao recuperar os usuários' });
        }
    },

    async create(request: Request, response: Response) {
        try {
            const {
                name,
                email,
                password
            } = request.body;

            const userRepository = getRepository(User);

            const data = {
                name,
                email,
                password: await bcrypt.hash(password, 8)
            }

            const schema = Yup.object().shape({
                name: Yup.string().required(),
                email: Yup.string().required(),
                password: Yup.string().required()
            });

            await schema.validate(data, {
                abortEarly: false
            });

            const user = userRepository.create(data);

            await userRepository.save(user);
            return response.status(201).json(user);
        } catch (err) {
            console.log(err);
            return response.status(400).json({ error: "Falha na criação do usuário" });
        }
    },

    async authenticate(request: Request, response: Response) {
        try {
            const {
                email,
                password
            } = request.body;

            const userRepository = getRepository(User);

            const user = await userRepository.findOne(email);

            if (!user) return response.status(400).json({ message: "Email não cadastrado" });

            console.log(password);

            if (!(user.compareHash(password))) return response.status(401).json({ message: 'Senha inválida' });

            return response.status(200).json({ token: user.generateToken() });
        } catch (err) {
            return response.status(404).json({ error: "Não foi possível realizar o processo de autenticação." })
        }
    }
}