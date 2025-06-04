import { useEffect, useState} from "react"
import  CARD  from './News-card' 
import Summarycard from './summarycard'
import axios from 'axios'
import Navbar from '../Home+Navbar-component/Navbar'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


type Article = {
  title: string;
  description: string;
  url:string;
  image: string;
  smryvisible:boolean
};



function News (){
  // FOR GENERATING NEWS ARTICLES //
   const [data ,setData] = useState<Article[]>([])
   const[smryloading_url ,setsmryloading_url] = useState("")
   useEffect(() => {
        const Data = async() => {
         let news_fetch  = await fetch(`https://gnews.io/api/v4/search?q=finance+business&lang=en&country=in&max=9&apikey=${import.meta.env.VITE_News_API_KEY_1}`);
         let news_data = await news_fetch.json()
          setData (news_data.articles); 
        }
        Data(); 
    },[])

   // SROLL-DOWN //
    // const scrollDown = () => {
    //      console.log("Scroll arrow clicked");
    //      const container = document.querySelector('.webpage');
    //     container?.scrollBy({
    //       top: window.innerHeight, // scroll down by one full viewport height
    //       behavior: 'smooth',
    //     });
    // };

    // FOR GENERATING SUMMARY//
    type news_summary = {
            summary: Record<string, string>;
    }
    const [Summary, setSummary] = useState<news_summary | null>(null);
    const [SummaryVisible, setSummaryVisible] = useState(false);

    const ShowSummary = async(src_url :string )=> {
          const news_url = {"url":src_url}
          setsmryloading_url(src_url)
          try{
          console.log("proceding to POST Request")
          const summary_fetch = await axios.post(`${import.meta.env.VITE_SUMMARU_API}`,news_url)
          console.log("POST succesfull")
          console.log("posted",summary_fetch .data);
          setSummary(summary_fetch.data);
          setSummaryVisible(true);
          
          }catch(error){
            console.error("Failed to load  summary")
            toast.error("Please try again after sometime");
           
          }finally{
            setsmryloading_url("")
          }
    }


    return (
  <> 
    <ToastContainer />
    <div
      className="relative min-h-full bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('/newsblue.jpg')` }}
    >
      {/* Navbar shares the same background now */}
      <Navbar />

      {/* News Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {data.map((news) => ( news.image &&
         
          <CARD
            key={news.url}
            title={news.title}
            img_url={news.image}
            description={news.description}
            src_url={news.url}
            onSummaryClick={() => ShowSummary(news.url)}
            smryloading = {smryloading_url == news.url}
          />
        
        ))}
      </div>

      {/* Summary Card */}
      <Summarycard
        visible={SummaryVisible}
        onClose={() => setSummaryVisible(false)}
        summaryText={Summary || { summary: { "": "" } }}
      />

      {/* Scroll Down Button */}
      {/* <button
        className="w-10 h-10 animate-bounce text-blue-600 fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
        onClick={scrollDown}
        aria-label="Scroll down"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 12.75L12 20.25 4.5 12.75"
          />
        </svg>
      </button> */}
    </div>
  </>
);

}
 
export default News


