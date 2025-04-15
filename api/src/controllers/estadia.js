const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar estadia
const create = async (req, res) => {
  try {
    const { automovelId, valorHora } = req.body;

    // Buscar placa do automóvel
    const automovel = await prisma.automovel.findUnique({
      where: { id: automovelId },
    });

    if (!automovel) {
      return res.status(404).json({ error: 'Automóvel não encontrado' });
    }

    const now = new Date();

    const estadia = await prisma.estadia.create({
      data: {
        automovelId,
        placa: automovel.placa,
        entrada: now,
        valorHora,
      },
    });

    res.status(201).json(estadia);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Listar todas as estadias
const read = async (req, res) => {
  const estadias = await prisma.estadia.findMany({
    include: {
      automovel: true,
    },
  });
  res.json(estadias);
};

// Buscar uma estadia por ID
const readOne = async (req, res) => {
  const id = parseInt(req.params.id);
  const estadia = await prisma.estadia.findUnique({
    where: { id },
    include: {
      automovel: true,
    },
  });

  if (estadia) res.json(estadia);
  else res.status(404).json({ error: 'Estadia não encontrada' });
};

// Atualizar estadia (ex: preencher saída e calcular valorTotal)
const update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { saida } = req.body;

    let updateData = { ...req.body };

    if (saida) {
      const estadiaExistente = await prisma.estadia.findUnique({ where: { id } });

      if (!estadiaExistente) {
        return res.status(404).json({ error: 'Estadia não encontrada' });
      }

      const entrada = new Date(estadiaExistente.entrada);
      const saidaDate = new Date(saida);

      const duracaoEmHoras = (saidaDate - entrada) / (1000 * 60 * 60);
      const valorTotal = parseFloat(duracaoEmHoras * parseFloat(estadiaExistente.valorHora)).toFixed(2);

      updateData = {
        ...updateData,
        saida: saidaDate,
        valorTotal: parseFloat(valorTotal),
      };
    }

    const estadia = await prisma.estadia.update({
      where: { id },
      data: updateData,
    });

    res.status(200).json(estadia);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Remover uma estadia
const remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.estadia.delete({ where: { id } });
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
