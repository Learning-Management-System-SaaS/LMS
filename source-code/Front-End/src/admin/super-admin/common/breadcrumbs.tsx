import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface breadCrumbsProps {
  pages: String[];
}
const Breadcrumbs = ({pages}: breadCrumbsProps) => {
    
  return (
    <div className="breadcrumbs text-sm">
      <ul>
        {pages.map((page) => (
          <button 
          // className="cursor-pointer"
          onClick={()=>{}}>
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
