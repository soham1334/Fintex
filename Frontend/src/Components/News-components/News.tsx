import { useEffect, useState } from "react";
import CARD from './News-card';
import Summarycard from './summarycard';
import axios from 'axios';
import Navbar from '../Home+Navbar-component/Navbar';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Article = {
  title: string;
  description: string;
  link: string;
  image_url: string;
  smryvisible: boolean;
};

function News() {
  const [data, setData] = useState<Article[]>([]);
  const [smryloading_url, setsmryloading_url] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`https://newsdata.io/api/1/latest?apikey=${import.meta.env.VITE_News_API_KEY_1}&country=in&language=en,mr&category=business&timezone=Asia/Kolkata`);
        const news_data = await res.json();
        setData(news_data.results);
        localStorage.setItem("lastNewsCall", Date.now().toString());
        localStorage.setItem("cachedNews", JSON.stringify(news_data.results));
        console.log("News API called");
      } catch (error) {
        toast.error("Failed to load news. Try again later.");
        console.log("Failed to load news. Try again later.");
      }
    };

    const lastCalled = parseInt(localStorage.getItem("lastNewsCall") || "0");
    const cachedData = localStorage.getItem("cachedNews");
    const now = Date.now();

    if (cachedData) {
      setData(JSON.parse(cachedData));
    }

    if (now - lastCalled >= 60000 || !cachedData) {
      fetchNews();
    } else {
      toast.error("Slow down! Refresh after 30 sec.");
    }
  }, []);

  type news_summary = {
    summary: Record<string, string>;
  };

  const [Summary, setSummary] = useState<news_summary | null>(null);
  const [SummaryVisible, setSummaryVisible] = useState(false);

  const ShowSummary = async (src_url: string) => {
  const now = Date.now();
  const DAY_IN_MS = 24 * 60 * 60 * 1000;

  // Load usage info
  let summarizedUrls = JSON.parse(localStorage.getItem("summaryUrls") || "[]") as string[];
  let firstCall = parseInt(localStorage.getItem("summaryFirstCallTimestamp") || "0");

  // Reset if 24h passed
  if (!firstCall || now - firstCall > DAY_IN_MS) {
    summarizedUrls = [];
    firstCall = now;
  }

  // If already summarized this URL today, just show summary without API call
  if (summarizedUrls.includes(src_url)) {
    
    setSummaryVisible(true);
    setsmryloading_url("");  
    return;
  }

  // Check if user reached daily unique summary limit
  if (summarizedUrls.length >= 3) {
    toast.error("You have reached the daily unique summary limit of 3.");
    return;
  }

  setsmryloading_url(src_url);

  try {
    const summary_fetch = await axios.post(`${import.meta.env.VITE_SUMMARU_API}`, { url: src_url });
    setSummary(summary_fetch.data);
    setSummaryVisible(true);

    // Add this URL to list and update localStorage
    summarizedUrls.push(src_url);
    localStorage.setItem("summaryUrls", JSON.stringify(summarizedUrls));
    localStorage.setItem("summaryFirstCallTimestamp", firstCall.toString());

  } catch (error) {
    console.error("Failed to load summary");
    toast.error("Please try again after sometime");
  } finally {
    setsmryloading_url("");
  }
};


  return (
    <>
      <ToastContainer />
      <div className="relative min-h-full bg-cover bg-center bg-fixed" style={{ backgroundImage: `url('/newsblue.jpg')` }}>
        <Navbar />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
          {data.slice(0, 9).map(news => (
            news.image_url &&
            <CARD
              key={news.link}
              title={news.title}
              img_url={news.image_url}
              description={news.description}
              src_url={news.link}
              onSummaryClick={() => ShowSummary(news.link)}
              smryloading={smryloading_url === news.link}
            />
          ))}
        </div>
        <Summarycard
          visible={SummaryVisible}
          onClose={() => setSummaryVisible(false)}
          summaryText={Summary || { summary: { "": "" } }}
        />
      </div>
    </>
  );
}

export default News;
