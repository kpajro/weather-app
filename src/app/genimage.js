export function GenImage({ memeimg }){  
    return (
        <img style={{minHeight: "300px", minWidth: "300px", maxHeight: "300px", maxWidth: "300px"}} src={memeimg}></img>
    )
}