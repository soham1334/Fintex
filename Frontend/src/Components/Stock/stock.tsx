import  { useEffect, useState } from 'react';

import Navbar from '../Home+Navbar-component/Navbar'
import axios from 'axios'
import SearchBar from './searchbar';
import CompanyTittle from './companytitle'
import { createContext } from "react"
import DescriptionValue from'./Description+value'
import Fundamentals from './fundamentals'
import Growth from './growth'
import ReportHoldings from './Report+holding'
import  MarketIndex from './marketIndex'
import ChatBot from './chatbot';


const CompanyNameContext = createContext<{company:string;setCompany:(value:string)=>void}| null>(null)
const SearchClick = createContext<{searchclick:boolean;setSearchclick:(value:boolean)=>void}|null>(null)

type company_info = {
  Company_Name:string;
  Sector:string;
  Industry:string;
  Website:string;
  Description:string;
  market_cap :number;
  enterprise_value:number ;
  price_to_book :number;
  shares_outstanding :number;
  beta :number;
  profit_margin :number;               
  operating_margin :number;    
  return_on_assets :number;
  return_on_equity :number;
  debt_to_equity :number;   
  current_ratio :number;         
  quick_ratio :number;
  annual_data :{period :string ,revenue:number , profit:number}[]     
  quarterly_data :{period :string ,revenue:number , profit:number}[]
  insiders : number;
  institutions : number;
  others : number;        
}
export default function YFinanceDashboard() {

  const[company,setCompany] = useState('Reliance Industries')
  const[searchclick,setSearchclick] = useState(true)
  const[company_info,setCompany_info] = useState<company_info|null>(null)

   useEffect(()=>{
    const fetch_title = async()=>{
       //console.log("Entered in fetch_title")
      const name = {'company':company}

      try{
        const response = await axios.post(`${import.meta.env.VITE_FINANCE_API}`,name)
       // console.log(response)
        setCompany_info(response.data)
      }catch(error){
        console.log("FAILED TO FETCH INFO",error)
      }finally{
        setSearchclick(false)
      }
    }
     searchclick && fetch_title()
  },[searchclick,company])
  
  // const func = ()=>{
  //   console.log("Company Info :")
  //   console.log(company_info?.insiders)
  //   console.log(company_info?.institutions)
  //   console.log(company_info?.others)
  // }
  // func()
  // const func = ()=>{
  //   console.log(Index[0]?.cur)
  //   console.log(Index[0]?.prev)
  //   console.log(Index[0]?.diff)
  // }
  // func()
  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-100 to-purple-400 p-4">
  <Navbar />
  {/* Mini CARD */}

   <MarketIndex/>
  <CompanyNameContext.Provider value = {{company , setCompany}}>
  <SearchClick.Provider value={{searchclick,setSearchclick}}>
  {/* Search Bar */}
   <SearchBar/>

  {/* Company Title */}
    <CompanyTittle companyname = {company_info?.Company_Name || "EMPTY"}/>

  {/* Description + Right Box */}
    <DescriptionValue
      Sector = {company_info?.Sector || "Not Available"}
      Industry = {company_info?.Industry || "Not Available"}
      Website = {company_info?.Website || "Not Available"}
      Description = {company_info?.Description || "Not Available"}
      />


  {/* Equal Width Text Areas */}
    <Fundamentals
      market_cap = {company_info?.market_cap??0  }
      enterprise_value = {company_info?.enterprise_value??0  }
      price_to_book = {company_info?.price_to_book??0  }
      shares_outstanding = {company_info?.shares_outstanding??0 }
      beta = {company_info?.beta??0 }
      profit_margin = {company_info?. profit_margin ??0  }             
      operating_margin  = {company_info?.operating_margin??0  }    
      return_on_assets  = {company_info?.return_on_assets??0  } 
      return_on_equity  = {company_info?.return_on_equity??0  } 
      debt_to_equity  = {company_info?.debt_to_equity??0  }  
      current_ratio  = {company_info?.current_ratio??0  }         
      quick_ratio  = {company_info?.quick_ratio??0  }       
     />

  {/* Box Pair 1 */}
    <Growth
      annual_data={company_info?.annual_data?? []}
      quarterly_data={company_info?.quarterly_data?? []}
    
    />

  {/* Box Pair 2 */}
    <ReportHoldings
     insiders = {company_info?.insiders??0  }
     institutions = {company_info?.institutions??0  }
     others = {company_info?.others??0  }
    />

    <ChatBot ></ChatBot>

    </SearchClick.Provider>  
    </CompanyNameContext.Provider>
</div>
 );
}
export {CompanyNameContext,SearchClick}
  



