import Square from "../util/square";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faBomb } from "@fortawesome/free-solid-svg-icons";

const colorKey = [
  "text-white",
  "text-sky-300",
  "text-green-400",
  "text-red-400",
  "text-purple-400",
  "text-fuchsia-500",
  "text-cyan-300",
  "text-black",
  "text-gray-400",
  "text-white",
];

export default function SquareComponent(props: {
  data: Square;
  onClick: (index: number) => void;
  onRightClick: (index: number) => void;
}) {
  return (
    <div
      className={`w-full aspect-square m-1 ${
        props.data.display == 10
          ? "bg-red-500"
          : props.data.display > -1
          ? "bg-blue-800"
          : "bg-blue-500"
      } ${
        props.data.display > -1 ? "" : "hover:bg-blue-400"
      } rounded text-center ${colorKey[props.data.display]} font-bold ${
        props.data.display > -1 ? "cursor-default" : "cursor-pointer"
      } grid place-content-center justify-center content-center text-xl lg:text-2xl xl:text-4xl`}
      onClick={() => props.onClick(props.data.index)}
      onContextMenu={(e) => {
        e.preventDefault();
        props.onRightClick(props.data.index);
      }}
    >
      {props.data.checked || props.data.display == 10 ? (
        <div className="w-full h-full text-center">
          <FontAwesomeIcon
            className="w-4/5 h-4/5 margin-auto"
            icon={props.data.display == 10 ? faBomb : faFlag}
          />
        </div>
      ) : props.data.display > 0 ? (
        props.data.display
      ) : (
        ""
      )}
    </div>
  );
}
