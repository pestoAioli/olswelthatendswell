import Head from "next/head";
import Image from "next/image";
import styles from "@component/styles/Home.module.css";
import { storefront } from "@component/utils/shopify";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHover } from "react-aria";

const gql = String.raw;

const productsQuery = gql`
  {
    products(first: 5) {
      edges {
        node {
          id
          title
          media(first: 5) {
            edges {
              node {
                ... on MediaImage {
                  id
                  image {
                    transformedSrc
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
const today = new Date();
export default function Home({ products }: any) {
  const { hoverProps, isHovered } = useHover({});
  const [timestamp, setTimestamp] = useState(null);
  const [date, setDate] = useState(today);
  const [width, setWidth] = useState(0);
  const [showComment, setShowComment] = useState<number | null>(null);
  const [comments, setComments] = useState([]);
  const [bars, setBars] = useState(() => {
    const bars = [];
    for (let i = 0; i < 130; i++) {
      bars.push(randomInteger(30, 60));
    }
    return bars;
  });
  const [smolBars, setSmolBars] = useState(() => {
    const bars = [];
    for (let i = 0; i < 130; i++) {
      bars.push(randomInteger(1, 30));
    }
    return bars;
  });
  const timeStampTaken = comments.map((com, i) => {
    return com.comment?.fakeTimestamp;
  });
  const setTodaysComments = useCallback(
    (data) => {
      let commentsOfToday = [];
      const day = date.getDate();
      const month = date.getMonth();
      for (let i = 0; i < data?.length; i++) {
        if (
          new Date(data[i].comment?.timestamp).getDate() === day &&
          new Date(data[i].comment?.timestamp).getMonth() === month
        ) {
          console.log(data[i].comment?.timestamp);
          commentsOfToday.push(data[i]);
        }
      }
      setComments(commentsOfToday);
    },
    [date]
  );

  useEffect(() => {
    function handleResize() {
      console.log("resized to: ", window.innerWidth, "x", window.innerHeight);
      setWidth(() => window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    const poop = fetch("/api/hello", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setTodaysComments(data));
    console.log("refresh");
  }, [date, setTodaysComments]);
  async function addAComment(e) {
    e.preventDefault();
    const data = {
      comment: e.target.comment.value,
      timestamp: new Date(),
      fakeTimestamp: timestamp,
    };
    if (timeStampTaken.includes(data.fakeTimestamp)) {
      alert("someone already left a comment at that timestamp rawrXD");
      return (e.target.comment.value = "");
    }
    const jsonData = JSON.stringify(data);
    const endpoint = "/api/hello";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    };

    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();
    console.log(result);

    const poop = fetch("/api/hello", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setComments(() => data));

    return (e.target.comment.value = "");
  }
  return (
    <>
      <Head>
        <title>olswel (╬ ಠ益ಠ)</title>
        <meta name="description" content="olswel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/olswellogo.png" />
      </Head>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            marginTop: 24,
            display: "flex",
          }}
        >
          <Image
            src={"/olswellogo.png"}
            width={width < 700 ? 180 : width < 650 ? 120 : 360}
            height={width < 700 ? 180 : width < 650 ? 120 : 360}
            alt="olswel"
          />
          <h1
            style={{
              fontSize: 48,
            }}
          >
            olswel.net
          </h1>
        </div>
        {/*shit went here*/}
        <div
          style={{
            alignSelf: "flex-start",
          }}
        >
          <p>Show comments from:</p>
          <input
            type="date"
            min={"2023-03-28"}
            onChange={(e) => {
              setDate(() => new Date(e.target.value));
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: 0.5,
          }}
          className={styles.pee}
        >
          {bars.map((bar, i) => (
            <div
              {...hoverProps}
              key={i}
              style={{
                width: "0.529vw",
                position: "relative",
                cursor: "pointer",
                marginTop: bar,
                minHeight: 70,
                backgroundColor:
                  timestamp !== null && i <= timestamp
                    ? "orange"
                    : isHovered
                    ? "grey"
                    : "darkgray",
                transition: "0.5s",
              }}
              onClick={() => {
                setTimestamp(() => i);
                console.log(comments);
              }}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            gap: 0.5,
            marginTop: 1,
          }}
        >
          {smolBars.map((bar, i) => (
            <div
              key={i}
              className={styles.poop}
              style={{
                width: "0.529vw",
                position: "relative",
                height: bar,
                backgroundColor: showComment === i ? "grey" : "darkgrey",
              }}
              onMouseOver={() => {
                setShowComment(() => i);
              }}
              onMouseOut={() => {
                setShowComment(() => null);
              }}
            >
              <div>
                {comments.map((com, k) => (
                  <>
                    {(i === com.comment?.fakeTimestamp &&
                      showComment === com.comment?.fakeTimestamp) ||
                    (i === com.comment?.fakeTimestamp && i === timestamp) ? (
                      <>
                        <Image
                          src={"/westadam.png"}
                          width={22}
                          height={42}
                          alt="westadam"
                          style={{
                            position: "relative",
                            right: 22,
                            bottom: 42,
                            zIndex: 2005,
                          }}
                        />
                        <p
                          style={{
                            backgroundColor: "white",
                            display: "inline-block",
                            paddingBottom: 12,
                            paddingTop: 12,
                            position: "relative",
                            bottom: 105,
                            zIndex: 2000,
                            whiteSpace: "nowrap",
                          }}
                          key={k}
                        >
                          {com.comment?.comment}
                        </p>
                      </>
                    ) : null}
                  </>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 20,
          }}
        >
          <form
            className={styles.formForNewSpot}
            onSubmit={addAComment}
            method="post"
            encType="application/json"
          >
            <input
              type="text"
              placeholder="Leave a comment xD"
              id="comment"
              name="comment"
              maxLength={42}
              style={{
                width: "48vw",
              }}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const data = await storefront(productsQuery);
  return {
    props: {
      products: data.data.products.edges,
    },
  };
}
