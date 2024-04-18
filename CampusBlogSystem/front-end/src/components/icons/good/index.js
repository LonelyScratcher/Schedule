import {useState} from "react";

export default function Good(props){
    let {size} = props
    const [num,setNum] = useState(0)
    const [isGood,setIsGood] = useState(false)
    if (!size) size = 22
    const color = isGood?"#FC5531":"#999AAA"
    const handleClick = () =>{
        const nextVal = !isGood
        if (nextVal) setNum(preNum=>preNum+1)
        else setNum(preNum=>preNum-1)
        setIsGood(preIsGood=>!preIsGood)
    }
    return (
        <div className="icon-container">
            <svg onClick={handleClick} t="1713342955105" className="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="5149" width={size} height={size}>
                <path
                    d="M884.875894 423.143253 646.970506 423.143253c92.185562-340.464205-63.516616-357.853247-63.516616-357.853247-65.993017 0-52.312436 52.182476-57.3031 60.881602 0 166.502152-176.849824 296.971645-176.849824 296.971645l0 472.171899c0 46.607504 63.516616 63.393819 88.433098 63.393819l357.452111 0c33.641191 0 61.036122-88.224344 61.036122-88.224344 88.434122-300.70569 88.434122-390.177444 88.434122-390.177444C944.657442 418.179195 884.875894 423.143253 884.875894 423.143253L884.875894 423.143253 884.875894 423.143253zM884.875894 423.143253M251.671415 423.299819 109.214912 423.299819c-29.420053 0-29.873378 28.89612-29.873378 28.89612l29.420053 476.202703c0 30.309306 30.361495 30.309306 30.361495 30.309306L262.420223 958.707948c25.686009 0 25.458835-20.049638 25.458835-20.049638L287.879058 459.411271C287.879058 422.837284 251.671415 423.299819 251.671415 423.299819L251.671415 423.299819 251.671415 423.299819zM251.671415 423.299819"
                    fill={color} p-id="5150"></path>
            </svg>
            <span style={{color:color}}>{num}</span>
        </div>

    )
}
