const seed = [
  { id: "1", title: "The Name of the Wind", author: "Patrick Rothfuss", genre: "Fantasy", year: 2007, description: "A legendary figure recounts his own story in a tale of adventure and magic.", coverColor: "#7B4FA6" },
  { id: "2", title: "Project Hail Mary", author: "Andy Weir", genre: "Science Fiction", year: 2021, description: "A lone astronaut must save the earth from disaster in this gripping sci-fi thriller.", coverColor: "#2E86AB" },
  { id: "3", title: "Educated", author: "Tara Westover", genre: "Biography", year: 2018, description: "A memoir about a young woman who grows up in a survivalist family and earns a PhD from Cambridge.", coverColor: "#A23B72" },
  { id: "4", title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", genre: "Science Fiction", year: 1979, description: "The classic comedic science fiction adventure across the universe.", coverColor: "#F18F01" },
  { id: "5", title: "Sapiens", author: "Yuval Noah Harari", genre: "History", year: 2011, description: "A brief history of humankind, exploring how Homo sapiens came to dominate Earth.", coverColor: "#6B4226" },
  { id: "6", title: "Normal People", author: "Sally Rooney", genre: "Fiction", year: 2018, description: "A deeply observed story about two young people navigating connection and identity.", coverColor: "#C0392B" },
];

let books = [...seed];
let nextId = 100;

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function json(res, status, data) {
  cors(res);
  res.status(status).json(data);
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  const { id } = req.query;

  if (!id) {
    if (req.method === "GET") {
      return json(res, 200, books);
    }
    if (req.method === "POST") {
      const book = { ...req.body, id: String(nextId++) };
      books.unshift(book);
      return json(res, 201, book);
    }
  } else {
    const idx = books.findIndex((b) => b.id === id);
    if (req.method === "GET") {
      if (idx === -1) return json(res, 404, { error: "Not found" });
      return json(res, 200, books[idx]);
    }
    if (req.method === "PUT") {
      if (idx === -1) return json(res, 404, { error: "Not found" });
      books[idx] = { ...books[idx], ...req.body, id };
      return json(res, 200, books[idx]);
    }
    if (req.method === "DELETE") {
      if (idx === -1) return json(res, 404, { error: "Not found" });
      const deleted = books.splice(idx, 1)[0];
      return json(res, 200, deleted);
    }
  }

  return json(res, 405, { error: "Method not allowed" });
}
