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
          {listData.map((data) => (
            <Card
              key={data.id}
              img={data.img}
              id={data.id}
              address={data.address}
              bathroom={data.bathroom}
              bedroom={data.bedroom}
              title={data.title}
              latitude={data.latitude}
              longitude={data.longitude}
              price={data.price}
            />
          ))}
        </div>
      </div>
      <div className="mapContainer">Map</div>
    </div>
  );
}
