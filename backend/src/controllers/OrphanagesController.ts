import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import Image from '../models/Image';
import OrphanageView from '../views/orphanages_view';
import * as Yup from 'yup';
import path from 'path';

import fs from 'fs';

export default {
    async index(request: Request, response: Response) {
        let { $filter } = request.query;
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images'],
            where: $filter
        });

        return response.json(OrphanageView.renderMany(orphanages));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.json(OrphanageView.render(orphanage));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;

        const orphanagesRepository = getRepository(Orphanage);

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename }
        });

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            pending: true,
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            pending: Yup.boolean(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false
        });

        const orphanage = orphanagesRepository.create(data);

        await orphanagesRepository.save(orphanage);
        return response.status(201).json(orphanage);
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            pending
        } = request.body;

        const orphanagesRepository = getRepository(Orphanage);
        const imagesRepository = getRepository(Image);

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            pending: pending === 'true',
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string(),
            latitude: Yup.number(),
            longitude: Yup.number(),
            about: Yup.string().max(300),
            instructions: Yup.string(),
            opening_hours: Yup.string(),
            open_on_weekends: Yup.boolean(),
            pending: Yup.boolean(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false
        });

        orphanage.name = data.name || orphanage.name;
        orphanage.latitude = data.latitude || orphanage.latitude;
        orphanage.longitude = data.longitude || orphanage.longitude;
        orphanage.about = data.about || orphanage.about;
        orphanage.instructions = data.instructions || orphanage.instructions;
        orphanage.opening_hours = data.opening_hours || orphanage.opening_hours;
        orphanage.open_on_weekends = open_on_weekends ? data.open_on_weekends : orphanage.open_on_weekends;
        orphanage.pending = pending ? data.pending : orphanage.pending;
        orphanage.images.push(...images.map(image => imagesRepository.create(image)));

        try {
            const updatedOrphanage = await orphanagesRepository.save(orphanage);
            return response.status(202).json(updatedOrphanage);
        } catch (err) {
            return response.status(401).json({ message: 'Erro ao tentar atualizar o orfanato', errorDetail: err });
        }
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const orphanagesRepository = getRepository(Orphanage);
        const imagesRepository = getRepository(Image);

        try {
            const orphanage = await orphanagesRepository.findOneOrFail(id, {
                relations: ['images']
            });

            orphanage?.images.forEach(image => {
                fs.unlink(path.join(__dirname, "..", "..", "uploads", image.path), () => { });

                imagesRepository.delete(image.id);
            });

            await orphanagesRepository.delete(id);

            return response.status(200).json({ message: "Orfanato removido com sucesso" });
        } catch (error) {
            return response.status(400).json({ message: "Erro ao tentar excluir o orfanato!", error: error });
        }
    },

    async getPendingOrphanages(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images'],
            where: 'pending=true'
        });

        return response.json(OrphanageView.renderMany(orphanages));
    },

    async getApprovedOrphanages(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images'],
            where: 'pending=false'
        });

        return response.json(OrphanageView.renderMany(orphanages));
    }
}