


type name = {
  companyname:string;
}
function CompanyTittle({companyname}:name){
  
 
 
    return(
        <div className="flex flex-row px-14 mb-2">
  <div className="w-full sm:w-[90%] lg:w-[75%]">
    <h1 className="text-4xl font-bold text-gray-900">{companyname}</h1>
  </div>
 
</div>

    )
}

export default CompanyTittle