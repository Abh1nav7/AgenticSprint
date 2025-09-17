# Agentic AI - Medical Diagnostic Platform

A modern web application that combines AI-powered medical diagnostics with an intuitive user interface. Built with React, TypeScript, FastAPI, and cutting-edge AI technologies.

## Features

- 🔒 Secure Authentication System
  - JWT-based authentication
  - Protected routes and API endpoints
  - User session management

- 💉 Medical Record Management
  - Upload and manage medical reports
  - Support for various file types (PDF, DICOM, Images)
  - Secure file storage and retrieval

- 🤖 AI-Powered Diagnostics
  - Automated analysis of medical records
  - Pattern recognition in medical images
  - Risk assessment and early warnings
  - Treatment suggestions

- 💬 Integrated AI Chatbot
  - Real-time medical consultations
  - Context-aware responses
  - Medical terminology understanding

## Tech Stack

### Frontend
- React with TypeScript
- TailwindCSS for styling
- Framer Motion for animations
- Lucide icons
- Context API for state management

### Backend
- FastAPI (Python)
- SQLite database
- JWT authentication
- File handling and storage
- AI model integration (upcoming)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.10 or higher)
- pnpm (preferred package manager)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd app
```

2. Install frontend dependencies:
```bash
pnpm install
```

3. Set up Python virtual environment and install backend dependencies:
```bash
cd backend
python -m venv venv
# For Windows:
venv\Scripts\activate
# For Unix/MacOS:
source venv/bin/activate
pip install -r requirements.txt
```

4. Start the development servers:

Frontend:
```bash
pnpm dev
```

Backend:
```bash
cd backend
uvicorn main:app --reload
```

## Project Structure

```
app/
├── src/                    # Frontend source code
│   ├── components/        # Reusable UI components
│   ├── contexts/         # React contexts (Auth, Toast)
│   ├── lib/             # Utilities and helpers
│   └── pages/           # Main application pages
├── backend/              # FastAPI backend
│   ├── main.py         # Main application file
│   └── requirements.txt # Python dependencies
└── public/              # Static assets
```

## Configuration

1. Frontend Environment Variables (.env):
```env
VITE_API_URL=http://localhost:8000
```

2. Backend Environment Variables:
```python
# Currently in main.py
SECRET_KEY = "supersecret_dev_key_change_me"
```

## Upcoming Features

- [ ] AI Model Integration
  - Medical image analysis
  - Report text analysis
  - Diagnostic predictions

- [ ] Enhanced User Profiles
  - Medical history tracking
  - Prescription management
  - Appointment scheduling

- [ ] Advanced Analytics
  - Health trends visualization
  - Risk factor analysis
  - Treatment effectiveness tracking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with ❤️ using modern web technologies