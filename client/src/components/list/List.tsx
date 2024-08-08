import { listData } from "../../dummyData";
import Card from "../card/Card";
import ListFilter from "../listFilter/ListFilter";
import "./list.scss";

export default function List() {
  return (
    <div className="list">
      <div className="listContainer">
        <div className="listFilter">
          <ListFilter />
        </div>
        <div className="listCards">
          {listData.map((ld) => (
            <Card key={ld.id} />
          ))}
        </div>
      </div>
      <div className="mapContainer">Map</div>
    </div>
  );
}
