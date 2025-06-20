
type prop = {
  title: string;
  img_url: string;
  description: string;
  src_url:string;
  onSummaryClick: (string :string ) => void;
  smryloading :boolean
};
 
function CARD({ title, img_url, description, src_url, onSummaryClick,smryloading }: prop) {

  // const[loading,setloading] = useState<boolean | null>(null)
 
  return (
    <div className = "p-2">
      <div className="max-w-sm h-[480px] flex flex-col rounded overflow-hidden shadow-lg bg-black/10 border border-gray-400 transition-transform duration-300 hover:shadow-xl hover:scale-[1.07]">
      <img className="w-full h-48 object-cover rounded mb-1 shadow-md" src={img_url} alt="News Image" />
      <div className="flex flex-col flex-1 p-4">
        <div className="flex-1 overflow-auto max-h-[200px]">
          <h5 className="text-lg font-bold text-gray-50 mb-2">{title}</h5>
          <p className="text-gray-200 text-sm mb-2" >{description}</p>
        </div>
        <div className="flex justify-evenly items-center gap-2 pt-4">
          <a
            href={src_url}
             target="_blank"
             rel="noopener noreferrer"
            className="text-center text-red-600 border border-red-600 text-sm font-medium px-3 py-2 rounded w-[100px] transition duration-200 hover:bg-red-600 hover:text-white hover:scale-105"
          >
            Read More
          </a>
           {smryloading?<button className="flex items-center justify-center gap-2 text-center text-white border text-sm bg-green-500 font-semibold py-2 rounded w-[100px] transition duration-200 hover:scale-105" disabled>
                         <i className="fas fa-spinner fa-spin"></i>
                              Loading...
                   </button> 
           : <button
            className="text-center text-green-500 border border-green-500 text-sm font-medium px-3 py-2 rounded w-[100px] transition duration-200 hover:bg-green-500 hover:text-white hover:scale-105"
            onClick={ ()=>(onSummaryClick (src_url))}  
          >
            Summary
          </button>
          }
        </div>
      </div>
    </div>
    
    </div>
  );
}

export default CARD;


