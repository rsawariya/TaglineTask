import { Filters } from "../../components"
import { useData } from "../../context/DataContext"
import Table from "../../components/Table"
import { useEffect } from "react";

const Home = () => {
    const {state, dispatch} = useData();
    
    const {data, filters, filteredData, appliedFilters, isFiltered}  = state;
   
    useEffect(()=>{
        console.log("appliedFilters", appliedFilters)
    },[appliedFilters])

    return <>
    <Filters filters={filters}/>
    <Table cols={Object.keys(filters)} rows={isFiltered ? filteredData : data} />
    </>

}

export default Home