# 📊 FinText - AI-Powered Financial Insight Chatbot

**FinText** is a modern AI-powered web application that delivers simplified financial insights to users. It combines live market data, real-time news summarization, and conversational AI to help users better understand the stock market and company fundamentals.

🌐 **Live Demo:** [https://fintex-81029.vercel.app/](https://fintex-81029.vercel.app/)

---

## 🚀 Features

- 📰 **Real-Time News Summarization:**  
  Summarizes business and financial news using NLP models to help users stay informed without reading full articles.

- 📊 **Company Fundamentals Insight:**  
  Explains essential stock metrics like P/E ratio, P/B ratio, and market cap using real-time data from Yahoo Finance.

- 💬 **AI Chatbot Interface:**  
  Built using Google PaLM to provide human-like answers to finance-related queries.

- 📈 **Market Trend Simplification:**  
  Transforms raw financial data and news into digestible summaries with plain-language explanations.

---

## 🧱 Tech Stack

### Backend

- **Django** & **Django REST Framework**
- **yfinance** – for company fundamentals
- **NewsAPI** – for real-time news
- **Google PaLM / Hugging Face Transformers** – for NLP/chatbot

### Frontend

- **React.js**
- **Tailwind CSS**
- **Axios**

---

## 📂 Project Structure

```
fintext/
├── backend/
│   ├── manage.py
│   └── news/
│       ├── views.py
│       ├── urls.py
│       ├── serializers.py
│       ├── utils.py
│       └── models.py
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   └── .env
```

---

## ⚙️ Local Setup Instructions

### Prerequisites

- Python 3.9+
- Node.js and npm
- Virtual environment tool (recommended)

---

### 🔧 Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

> Add your OpenAI API key in `.env` or settings.

---

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

### `frontend/.env`

```env
VITE_NEWS_API_KEY=your_news_api_key_here
VITE_BACKEND_URL = your_backend_domain
```

### `backend/news/.env` or `settings.py`

```env
OPENAI_API_KEY=your_openai_api_key_here
```

---

## ✅ Roadmap

- [ ] Add sentiment analysis for financial news
- [ ] Live stock chart (WebSocket or polling)
- [ ] Company comparison tool
- [ ] Deploy backend (Render/Railway)
- [ ] CI/CD pipeline
- [ ] Improve chatbot context handling

---

## 📸 Screenshots

*Coming soon – Add screenshots of your UI and chatbot here!*

---

## 💡 Inspiration

**FinText** was created to simplify complex financial information using conversational AI. It's built to help users understand market news, trends, and company performance without financial jargon.

---

## 📝 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

