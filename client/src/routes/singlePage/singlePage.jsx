import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useLoaderData, useParams } from "react-router-dom";
import { DEFAULT_IMAGE } from "../../constants/image";
import DOMPurify from 'dompurify'
import { useContext, useEffect, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";


function SinglePage() {
  const post = useLoaderData()
  const [isSaved, setIsSaved] = useState(false)
  const { id } = useParams();
  const { user } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")


  useEffect(() => {
    setIsSaved(post.isSaved)
  }, [post])


  const handleSave = async () => {
    try {
      setIsLoading(true)
      setError("")
      const savedPost = await apiRequest.post(`/user/save-post`, {
        postId: id
      })

      setIsSaved(savedPost.data?.data?.savedPost)
    } catch (e) {
      setError(e.response?.data?.error ?? "Error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar || DEFAULT_IMAGE} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div className="bottom" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.postDetails.description) }}></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                <p>{post.postDetails.utilities}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>{post.postDetails.pet}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Property Fees</span>
                <p>{post.postDetails.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetails.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{post.postDetails.school}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetails.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetails.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} position={[post.latitude, post.longitude]} />
          </div>
          {user && <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            {isLoading ? <div>Loading</div> : <button onClick={handleSave} style={{ backgroundColor: isSaved ? "#fece51" : "white" }} >
              <img src="/save.png" alt="" />
              {isSaved ? "Place Saved" : "Save the Place"}
            </button>}
          </div>}
          {error && <span>{error}</span>}
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
