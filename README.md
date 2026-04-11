# ClassSupport

AI-powered pupil support tool for teachers. Generate practical, classroom-friendly strategies based on pupil behaviour, attention, or anxiety concerns. Save and review notes over time.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI:** OpenAI GPT-4o-mini
- **Storage:** localStorage (MVP)

## Getting Started

### Prerequisites

- Node.js 18+
- An OpenAI API key

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```
OPENAI_API_KEY=your_openai_api_key_here
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Folder Structure

```
app/
  page.tsx              # Root redirect (login or dashboard)
  layout.tsx            # Global layout with Navbar
  login/page.tsx        # Login page (MVP: any credentials)
  dashboard/page.tsx    # Dashboard with quick actions
  new-response/page.tsx # Form to generate support strategies
  saved-notes/page.tsx  # View and manage saved notes
  api/generate/route.ts # OpenAI API route
  error.tsx             # Global error boundary
  loading.tsx           # Global loading state

components/
  Navbar.tsx                 # Navigation with mobile hamburger menu
  LoginForm.tsx              # Email/password login form
  ConcernSelector.tsx        # Concern type card selector
  ObservationCheckboxGroup.tsx # Behaviour observation checkboxes
  TeacherNotesInput.tsx      # Free-text teacher notes
  ContextFields.tsx          # Age group, setting, frequency dropdowns
  GenerateButton.tsx         # Generate button with loading spinner
  ResultsCard.tsx            # AI response display (6 sections)
  SaveNoteForm.tsx           # Save note with pupil ID and notes
  SavedNotesList.tsx         # Saved notes list with expand/delete

lib/
  openai.ts   # OpenAI client and prompt construction
  storage.ts  # localStorage helpers (saveNote, getNotes, deleteNote, getNoteById)
  types.ts    # TypeScript interfaces
```

## User Flow

1. **Login** - Enter any email/password (MVP demo)
2. **Dashboard** - View saved note count, quick links
3. **New Response** - Select concern, observations, context, generate AI strategies
4. **Save Note** - Attach pupil initials and teacher notes
5. **Saved Notes** - View, expand, or delete saved notes
