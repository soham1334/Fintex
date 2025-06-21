# 📊 FinText - AI-Powered Financial Insight Chatbot

**FinText** is a modern AI-powered web application that delivers simplified financial insights to users. It combines live market data, real-time news summarization, and conversational AI to help users better understand the stock market and company fundamentals.

🌐 **Live Demo:** [https://fintex-eight.vercel.app/](https://fintex-eight.vercel.app/)

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


![Screenshot 2025-06-05 115205](https://github.com/user-attachments/assets/58efb612-0c66-41b9-879d-af920574d5ce)

<img width="959" alt="image" src="https://github.com/user-attachments/assets/8ba12465-4853-409d-a632-febe6321b4d3" />

![Screenshot 2025-06-05 115247](https://github.com/user-attachments/assets/bd199f24-dc12-4700-a46f-df0114fc9082)

<img width="947" alt="image" src="https://github.com/user-attachments/assets/76f8c942-49ac-4342-b226-3020a85ceed8" />

<img width="947" alt="image" src="https://github.com/user-attachments/assets/2b6c24ac-cbde-40f9-a11d-757fcd2a99bb" />

<img width="947" alt="image" src="https://github.com/user-attachments/assets/2dc49c10-d635-4113-aecf-d21ec370b9f4" />






---

## 💡 Inspiration

**FinText** was created to simplify complex financial information using conversational AI. It's built to help users understand market news, trends, and company performance without financial jargon.

---

## 📝 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

