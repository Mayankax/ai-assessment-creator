# AI Assessment Creator

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![BullMQ](https://img.shields.io/badge/BullMQ-Queue-red)

AI Assessment Creator is a full-stack app that generates structured question papers using Google Gemini, processes jobs asynchronously with BullMQ, stores results in MongoDB, and streams real-time job updates to a Next.js frontend through Socket.IO.

## Why This Project Is Useful

- Generate complete assignments from a flexible question blueprint (MCQ, short, numerical, diagram-based)
- Process long-running AI generation tasks asynchronously with a queue/worker architecture
- Receive real-time status and result updates in the UI without manual refresh
- Validate AI output with Zod before persisting to keep response shape predictable
- Export generated assignments as downloadable PDFs

## Architecture Overview

```text
frontend (Next.js) --> backend API (Express)
													|
													+--> BullMQ queue (Redis)
																 |
																 +--> worker --> Gemini API
																							 --> Zod validation
																							 --> MongoDB (status + result)
													|
													+--> Socket.IO events back to frontend
```

## Tech Stack

- Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS, Zustand, Socket.IO client
- Backend: Express, TypeScript, BullMQ, Socket.IO, Mongoose, Puppeteer, Zod
- Infra dependencies: MongoDB, Redis, Gemini API key

## Project Structure

```text
.
|- backend/
|  |- src/
|  |  |- config/      # MongoDB, Redis, BullMQ setup
|  |  |- routes/      # Assignment API routes
|  |  |- workers/     # Queue worker for AI generation
|  |  |- services/    # Gemini + PDF services
|  |  |- models/      # Mongoose schema
|  |  |- types/       # Zod output schema
|  |  |- utils/       # parsing/validation helpers
|- frontend/
|  |- src/
|  |  |- app/         # Next.js routes
|  |  |- components/  # UI components
|  |  |- lib/         # API + socket helpers
|  |  |- store/       # Zustand state
```

## Getting Started

### Prerequisites

- Node.js 20+ (recommended)
- npm
- Redis running locally on `127.0.0.1:6379`
- MongoDB connection string
- Gemini API key

### 1. Clone and Install

```bash
git clone https://github.com/Mayankax/ai-assessment-creator.git
cd ai-assessment-creator

cd backend
npm install

cd ../frontend
npm install
```

### 2. Configure Environment Variables (Backend)

Create a `.env` file inside `backend/`:

```bash
MONGO_URI=mongodb://127.0.0.1:27017/ai-assessment-creator
GEMINI_API_KEY=your_gemini_api_key
```

Notes:

- Backend currently listens on port `5000`
- Frontend and socket/API URLs are hardcoded to `http://localhost:5000` in `frontend/src/lib/api.ts` and `frontend/src/lib/socket.ts`

### 3. Run the App

Open two terminals.

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

Then open `http://localhost:3000`.

## Usage

1. Open the app and click Create Assignment.
2. Add question types, counts, and marks.
3. Submit the form.
4. Track status updates (`pending` -> `processing` -> `completed`) in real time.
5. Download the generated PDF from the output page.

### Example API Calls

Create an assignment:

```bash
curl -X POST http://localhost:5000/api/assignment/create \
	-H "Content-Type: application/json" \
	-d '{
		"dueDate": "2026-04-01",
		"totalQuestions": 4,
		"totalMarks": 20,
		"instructions": "All questions are compulsory",
		"questions": [
			{ "type": "MCQ", "count": 2, "marks": 2 },
			{ "type": "Short", "count": 2, "marks": 8 }
		]
	}'
```

Check assignment status/result:

```bash
curl http://localhost:5000/api/assignment/<jobId>
```

Download generated PDF:

```bash
curl -L http://localhost:5000/api/assignment/<jobId>/pdf --output assignment.pdf
```

## Available Scripts

Backend (`backend/package.json`):

- `npm run dev` - start backend with watcher (`tsx`)
- `npm run build` - compile TypeScript to `dist/`
- `npm start` - run compiled backend from `dist/index.js`

Frontend (`frontend/package.json`):

- `npm run dev` - start Next.js dev server
- `npm run build` - create production build
- `npm start` - run production server
- `npm run lint` - run ESLint

## Where To Get Help

- Open a GitHub issue: https://github.com/Mayankax/ai-assessment-creator/issues
- Backend entry and API routing: `backend/src/index.ts`, `backend/src/routes/assignment.routes.ts`
- Frontend API integration: `frontend/src/lib/api.ts`
- Frontend real-time socket integration: `frontend/src/lib/socket.ts`
- Framework docs:
	- Next.js: https://nextjs.org/docs
	- Express: https://expressjs.com/
	- BullMQ: https://docs.bullmq.io/
	- Mongoose: https://mongoosejs.com/docs/

## Maintainers And Contributing

Maintainer:

- @Mayankax

Contributions are welcome. For now, use this lightweight flow:

1. Fork the repository.
2. Create a feature branch.
3. Keep changes focused and include clear commit messages.
4. Run frontend linting and verify backend starts locally.
5. Open a pull request with a concise description and screenshots (if UI-related).

If you plan a larger change, please open an issue first to discuss scope.
