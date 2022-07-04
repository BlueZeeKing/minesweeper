import Square from "../util/square";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

export default function SquareComponent(props: {
  data: Square;
  onClick: (index: number) => void;
  onRightClick: (index: number) => void;
}) {
  return (
    <div
      className={`w-full aspect-square m-1 ${
        props.data.display > -1 ? "bg-blue-400" : "bg-blue-500"
      } hover:bg-blue-400 rounded text-center text-white ${
        props.data.display > -1 ? "cursor-default" : "cursor-pointer"
      } grid place-content-center text-xl lg:text-2xl xl:text-4xl`}
      onClick={() => props.onClick(props.data.index)}
      onContextMenu={(e) => {
        e.preventDefault();
        props.onRightClick(props.data.index);
      }}
    >
      {props.data.checked ? (
        <FontAwesomeIcon className="w-4/5 h-4/5 margin-auto" icon={faFlag} />
      ) : props.data.display > 0 ? (
        props.data.display
      ) : (
        ""
      )}
    </div>
  );
}
