const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar um novo automóvel
const create = async (req, res) => {
  try {
    const automovel = await prisma.automovel.create({
      data: req.body,
    });
    res.status(201).json(automovel);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Listar todos os automóveis
const read = async (req, res) => {
  try {
    const automoveis = await prisma.automovel.findMany({
      include: {
        estadias: true, // Relaciona as estadias do automóvel
      },
    });
    res.json(automoveis);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Buscar automóvel por ID
const readOne = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const automovel = await prisma.automovel.findUnique({
      where: { id },
      include: {
        estadias: true, // Mostra as estadias associadas
      },
    });

    if (automovel) res.json(automovel);
    else res.status(404).json({ error: 'Automóvel não encontrado' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Atualizar automóvel por ID
const update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const automovel = await prisma.automovel.update({
      where: { id },
      data: req.body,
    });

    res.status(200).json(automovel);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Deletar automóvel
const remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.automovel.delete({
      where: { id },
    });

    res.status(204).end();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = {
  create,
  read,
  readOne,
  update,
  remove,
};
