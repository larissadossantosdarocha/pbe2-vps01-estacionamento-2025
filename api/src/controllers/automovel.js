const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const estadia = await prisma.estadia.create({
            data: req.body
        });
        res.status(201).json(estadia);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

const read = async (req, res) => {
    const estadias = await prisma.estadia.findMany({
        include: {
            telefone: true,
            atividade: true
        }
    });
    res.json(estadias);
}

const readOne = async (req, res) => {
    const estadia = await prisma.estadia.findUnique({
        where: {
            ra: req.params.id
        },
        include: {
            telefone: true,
            atividade: true
        }
    });
    if (estadia) res.json(estadia);
    else res.status(404).json({ error: 'estadia não encontrado' });
}

const update = async (req, res) => {
    try {
        const estadia = await prisma.estadia.update({
            where: {
                ra: req.params.id
            },
            data: req.body
        });
        res.status(200).json(estadia);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

const remove = async (req, res) => {
    try {
        await prisma.estadia.delete({
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