import { getRepository } from 'typeorm';
import { Request, Response } from "express";
import fs from 'fs';
import path from 'path';
import Image from '../models/Image';

export default {
    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const imagesRepository = getRepository(Image);

        try {
            const image = await imagesRepository.findOneOrFail(id);

            fs.unlink(path.join(__dirname, "..", "..", "uploads", image.path), () => { });

            await imagesRepository.delete(id);
            return response.status(200).json({ message: 'Imagem removida com sucesso!' });
        } catch (err) {
            return response.status(400).json({ message: 'Erro ao tentar remover a imagem', errorDetail: err });
        }
    }
}