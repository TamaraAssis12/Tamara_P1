const createCategoria = `
    CREATE TABLE IF NOT EXISTS categoria (
        id TEXT PRIMARY KEY,
        nome TEXT NOT NULL
    );
`;

module.exports = createCategoria;