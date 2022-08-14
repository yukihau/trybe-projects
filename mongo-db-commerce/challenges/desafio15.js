db.produtos.updateMany(
    {},
    { $set: { avaliacao: NumberInt(0) } },
);

db.produtos.updateMany(
    { tags: { $in: ["bovino"] } },
    { $set: { avaliacao: NumberInt(5) } },
);

db.produtos.updateMany(
    { tags: { $in: ["ave"] } },
    { $set: { avaliacao: NumberInt(3) } },
);

db.produtos.find(
    {},
    { nome: 1, avaliacao: 1, _id: 0 },
);