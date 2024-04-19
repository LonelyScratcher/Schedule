
export default function View(props){
    let {viewNum,size} = props;
    if (!size) size = 22
    return (
        <div className="icon-container">
            <svg t="1713522331277" className="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="11385" width={size} height={size}>
                <path
                    d="M512 170.656c-338.304 0-512 340.96-512 340.96s131.072 340.992 512 340.992c344.96 0 512-339.68 512-339.68S855.648 170.656 512 170.656z m0.768 554.08c-123.68 0-213.12-93.248-213.12-213.12s89.408-213.12 213.12-213.12c123.68 0 213.12 93.216 213.12 213.12s-89.408 213.12-213.12 213.12z m0-340.992c-70.688 0.16-127.872 59.36-127.872 127.872 0 68.448 57.184 127.872 127.872 127.872s127.872-59.424 127.872-127.872c0-68.512-57.184-128-127.872-127.872z"
                    fill="#999AAA" p-id="11386"></path>
            </svg>
            <span style={{color:'#999AAA'}}>{viewNum}</span>
        </div>
    )
}
