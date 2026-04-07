import { useNavigate } from "react-router-dom";
import back from "../assets/back.png";

const PageHeader = ({ title }: { title: string }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-12 flex items-center justify-center relative px-4">
      <button
        onClick={() => navigate(-1)}
        className="absolute left-0 flex items-center justify-center w-10 h-10"
      >
        <img className="w-[25px] cursor-pointer" src={back} />
      </button>

      <h1 className="text-white text-lg">{title}</h1>
    </div>
  );
};
export default PageHeader;
