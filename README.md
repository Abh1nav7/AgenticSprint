# Agentic AI - Medical Diagnostic Platform

A modern web application that combines AI-powered medical diagnostics with an intuitive user interface. Built with React, TypeScript, FastAPI, and cutting-edge AI technologies.

## Features

- 🔒 Secure Authentication System
  - JWT-based authentication
  - Protected routes and API endpoints
  - User session management
  - Profile customization with avatar support

- 💉 Medical Record Management (Coming Soon!)
  - AI-powered analysis of medical records
  - Support for various file types
  - Secure document processing
  - Automated insights generation

- 🏥 Dual Mode Access
  - Doctor Mode: Professional medical analysis tools
    - Access via: https://medbot-backend-production-505e.up.railway.app/
    - Complete medical analysis capabilities
    - Professional diagnostic tools
  
  - Patient Mode: User-friendly interface
    - Access via: https://chatbot1-grlj.onrender.com/
    - Simplified consultation features
    - Easy-to-understand reports

- 🤖 AI Integration
  - OpenRouter AI integration
  - Advanced medical document analysis
  - Risk assessment and early warnings
  - Detailed recommendations
  - Confidence metrics for analysis

## Tech Stack

### Frontend
- React with TypeScript
- TailwindCSS for styling
- Framer Motion for animations
- Lucide icons
- Context API for state management
- Toast notifications
- Modal dialogs
- Protected routes
- Form validation

### Backend
- FastAPI (Python 3.13+)
- SQLite database
- JWT authentication
- OpenRouter AI integration
- File handling and storage
- Environment configuration
- Async processing

### AI Integration
- OpenRouter AI API
- Model: deepseek/deepseek-chat-v3.1
- JSON-structured responses
- Medical context awareness
- Confidence scoring

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.13 or higher)
- OpenRouter API key

### Environment Setup
1. Create `.env` file in backend directory:
```
OPENROUTER_API_KEY=your_api_key_here
```

### Backend Installation
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Installation
```bash
npm install
npm run dev
```

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