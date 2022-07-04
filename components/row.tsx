import SquareComponent from "./square";
import Square from "../util/square";

export default function Row(props: {
  row: Square[];
  onClick: (index: number) => void;
  onRightClick: (index: number) => void;
}) {
  return (
    <div className="flex flex-row w-full">
      {props.row.map((item, index) => (
        <SquareComponent
          key={index}
          data={item}
          onClick={props.onClick}
          onRightClick={props.onRightClick}
        />
      ))}
    </div>
  );
}
