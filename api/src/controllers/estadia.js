const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const automovel = await prisma.automovel.create({
            data: req.body
        });
        res.status(201).json(automovel);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

const read = async (req, res) => {
    const automovels = await prisma.automovel.findMany({
        include: {
            telefone: true,
            atividade: true
        }
    });
    res.json(automovels);
}

const readOne = async (req, res) => {
    const automovel = await prisma.automovel.findUnique({
        where: {
            ra: req.params.id
        },
        include: {
            telefone: true,
            atividade: true
        }
    });
    if (automovel) res.json(automovel);
    else res.status(404).json({ error: 'automovel não encontrado' });
}

const update = async (req, res) => {
    try {
        const automovel = await prisma.automovel.update({
            where: {
                ra: req.params.id
            },
            data: req.body
        });
        res.status(200).json(automovel);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

const remove = async (req, res) => {
    try {
        await prisma.automovel.delete({
            where: {
                ra: req.params.id
            }
        });
        res.status(204).end();
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

module.exports = {
    create,
    read,
    readOne,
    update,
    remove
}