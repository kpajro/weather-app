
export function FetchButton({ name,fetchData, keys}){
    return(
        <div>
            <button onClick={fetchData} onKeyDown={keys}>{name}</button>
        </div>
    )
    
}