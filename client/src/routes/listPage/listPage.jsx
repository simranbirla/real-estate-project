import { listData } from "../../lib/dummydata";
import "./listPage.scss";
import Filter from "../../components/filter/Filter"
import Card from "../../components/card/Card"
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function ListPage() {

  const list = useLoaderData();

  return <div className="listPage">
    <div className="listContainer">
      <div className="wrapper">
        <Filter />
        <Suspense fallback={<p>Loading</p>}>
          <Await
            resolve={list.postResponse}
            errorElement={
              <p>Error loading package location!</p>
            }
          >
            {(postResponse) => (
              postResponse.data.data.map(item => (
                <Card key={item.id} item={item} />
              ))
            )}
          </Await>
        </Suspense>
      </div>
    </div>
    <div className="mapContainer">
      <Suspense fallback={<p>Loading</p>}>
        <Await
          resolve={list.postResponse}
          errorElement={
            <p>Error loading package location!</p>
          }
        >
          {(postResponse) => (
            <Map items={postResponse.data?.data ?? []} />
          )}
        </Await>
      </Suspense>
    </div>
  </div>;
}

export default ListPage;
