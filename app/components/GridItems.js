'use client'
 
export const GridItems = (props) => {
    return (
        <div className={props.index > 3 ? "col-md-3 mt-4" : "col-md-3"}>
            <div className="card" style={{width: "18rem"}}>
                <img 
                    src={props.item.detail && props.item.detail.sprites ? props.item.detail.sprites.front_shiny : ''} 
                    className="card-img-top align-self-center mt-2" 
                    alt={props.item.name}
                    style={{width: "150px"}}
                    onError={({currentTarget}) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src="/image/default-image.png";
                    }} />
                <div className="card-body">
                    {
                        props.item.nickname ? 
                        <>
                            <h5
                                onClick={() => props.click_detail(props.item)}
                                className="card-title" 
                                style={{color: "#0070f3", cursor: "pointer"}}>
                                { props.item.nickname }{ props.item.renamed > 0 ? `-${props.item.renamed - 1}` : '' }
                            </h5> 
                            <span
                                onClick={() => props.click_detail(props.item)}
                                className="fw-light" 
                                style={{ccursor: "pointer"}}>
                                { props.item.name }
                            </span> 
                        </>:
                        <h5
                            onClick={() => props.click_detail(props.item)}
                            className="card-title" 
                            style={{color: "#0070f3", cursor: "pointer"}}>
                            { props.item.name }
                        </h5>
                    }
                    <div className="d-flex flex-column mt-1">
                        <div className="mb-2">
                            <span className="fw-light" style={{fontSize: "13px", marginRight: "5px"}}>Moves :</span>
                            <div className="d-flex gap-2 mt-1">
                                {
                                    props.item.detail && props.item.detail.moves && props.item.detail.moves.length > 0 ?
                                        props.item.detail.moves.map((data, i) => {
                                            return <span 
                                                    className={`badge bg-primary d-flex align-items-center self-items-center ${i}`}
                                                    style={{fontSize: "9px"}} 
                                                    key={`move${i}`}>
                                                        {data.move.name}
                                                </span>
                                        })
                                    :
                                    <>
                                        -
                                    </>
                                }
                            </div>
                        </div>
                        <div>
                            <span className="fw-light" style={{fontSize: "13px", marginRight: "5px"}}>Types :</span>
                            <div className="d-flex gap-2 mt-1">
                                {
                                    props.item.detail && props.item.detail.types && props.item.detail.types.length > 0 ?
                                        props.item.detail.types.map((data, i) => {
                                            return <span 
                                                    className={`badge bg-warning d-flex align-items-center self-items-center ${i}`}
                                                    style={{fontSize: "9px"}} 
                                                    key={`type${i}`}>
                                                        {data.type.name}
                                                </span>
                                        })
                                    :
                                    <>
                                        -
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}