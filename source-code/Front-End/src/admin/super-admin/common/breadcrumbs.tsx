import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

interface breadCrumbsProps {
  pages: String[];
}
const Breadcrumbs = ({pages}: breadCrumbsProps) => {
    const navigate = useNavigate()
    const handleNavigate = (page:String)=>{
        if(pages[pages.length-1]===page)return;
        const backSteps = pages.indexOf(page)-pages.length-1
        console.log(backSteps)
        navigate(backSteps)
    }
  return (
    <div className="breadcrumbs text-sm">
      <ul>
        {pages.map((page) => (
          <button className="cursor-pointer"
          onClick={()=>handleNavigate(page)}>
            <li>
              {(page==='')?null:page } {pages.indexOf(page)+1===pages.length?null:<FontAwesomeIcon icon={faAngleRight} />} 
            </li>
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
