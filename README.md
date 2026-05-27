# Bibliostack

A book management app built with React. Lets you add, edit, delete, and search through your personal book collection.

## Features

- View books in a card grid with title, author, genre, and year
- Add and edit books through a modal form
- Delete books with a confirmation step
- Search by title or author
- Filter by genre, sort by title / author / year
- Loading states and basic error handling

## Tech

- React 19 + Vite
- Axios for HTTP requests
- json-server for local mock API
- Vercel serverless functions for deployment
- react-hot-toast for notifications
- lucide-react for icons

## Getting Started

### Requirements

- Node.js 18+
- npm 9+

### Setup

```bash
git clone https://github.com/YOUR_USERNAME/bibliostack.git
cd bibliostack
npm install
```

### Running locally

You need two terminals:

```bash
# Terminal 1 - start the mock API on port 3001
npm run dev:api

# Terminal 2 - start the React app on port 5173
npm run dev
```

Or run both together:

```bash
npm run dev:full
```

Open http://localhost:5173

### Build

```bash
npm run build
npm run preview
```

## Deployment

The app uses Vercel serverless functions for the API, so no external service is needed.

```bash
npm install -g vercel
vercel --prod
```

The `vercel.json` file handles routing for `/api/books/:id`.

Note: the serverless API is in-memory, so data resets on cold starts. To persist data, swap the array in `api/books.js` with a real database.

## Project Structure

```
bibliostack/
├── api/
│   └── books.js
├── src/
│   ├── components/
│   │   ├── BookCard.jsx
│   │   ├── BookForm.jsx
│   │   ├── SearchBar.jsx
│   │   ├── FilterBar.jsx
│   │   ├── LoadingGrid.jsx
│   │   ├── EmptyState.jsx
│   │   └── ErrorBanner.jsx
│   ├── hooks/
│   │   ├── useBooks.js
│   │   └── useFilteredBooks.js
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── constants.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── db.json
├── vercel.json
└── vite.config.js
```

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/books | Get all books |
| POST | /api/books | Add a book |
| GET | /api/books/:id | Get one book |
| PUT | /api/books/:id | Update a book |
| DELETE | /api/books/:id | Delete a book |

Book shape:

```json
{
  "id": "string",
  "title": "string",
  "author": "string",
  "genre": "string",
  "year": "number",
  "description": "string",
  "coverColor": "string"
}
```

## License

MIT