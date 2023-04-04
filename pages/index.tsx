import Head from "next/head";
import Image from "next/image";
import styles from "@component/styles/Home.module.css";
import { storefront } from "@component/utils/shopify";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHover } from "react-aria";
import moment from "moment";
import Script from "next/script";

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
// const today = new Date().toISOString().slice(0, 10);
const today = moment().format().slice(0, 10);
export default function Home({ products }: any) {
  const { hoverProps, isHovered } = useHover({});
  const [timestamp, setTimestamp] = useState(null);
  const [date, setDate] = useState(today);
  const [width, setWidth] = useState(null);
  const [showComment, setShowComment] = useState<number | null>(null);
  const [comments, setComments] = useState([]);
  const [updateComments, setUpdateComments] = useState(false);
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
  const setTodaysComments = useCallback(
    (data) => {
      let commentsOfToday = [];
      for (let i = 0; i < data?.length; i++) {
        const x = data[i].comment.timestamp;
        if (typeof x === "string") {
          if (data[i].comment.timestamp.slice(0, 10) === date) {
            commentsOfToday.push(data[i]);
          }
        }
        if (typeof x === "number") {
          console.log(
            moment(x).format().slice(0, 10),
            "number format check thang"
          );
          if (moment(x).format().slice(0, 10) === date)
            commentsOfToday.push(data[i]);
        }
      }
      setComments(commentsOfToday);
    },
    [date]
  );
  let timeStampTaken = useRef([]);
  function handleResize() {
    console.log("resized to: ", window.innerWidth, "x", window.innerHeight);
    setWidth(() => window.innerWidth);
  }
  useEffect(() => {
    console.log(today, "today");
    console.log(moment().format());
    timeStampTaken.current = comments.map((com, i) => {
      return com.comment?.fakeTimestamp;
    });
    console.log(timeStampTaken.current);
    console.log(width);
    setWidth(() => window.innerWidth);
    console.log(Date.parse(today.toLocaleString().slice(0, 8)));
    window.addEventListener("resize", handleResize);
    const poop = fetch("/api/hello", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setTodaysComments(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, setTodaysComments, updateComments]);

  async function addAComment(e) {
    e.preventDefault();
    const data = {
      comment: e.target.comment.value,
      timestamp: date,
      fakeTimestamp: timestamp,
      name: e.target.name.value,
    };
    if (timeStampTaken.current.includes(data.fakeTimestamp)) {
      console.log(timeStampTaken.current);
      alert("someone already left a comment at that timestamp rawrXD");
      e.target.comment.value = "";
      e.target.comment.name = "";
      return false;
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

    // const poop = fetch("/api/hello", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => setTodaysComments(() => data));

    e.target.comment.value = "";
    e.target.name.value = "";
    return setUpdateComments(!updateComments);
  }
  return (
    <>
      <Head>
        <title>olswel (╬ ಠ益ಠ)</title>
        <meta name="description" content="olswel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/olswellogo.png" />
      </Head>
      <Script src="https://sellfy.com/js/api_buttons.js%22%3E" />
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
            marginRight: 50,
          }}
        >
          <Image
            src={"/olswellogo.png"}
            priority
            width={
              width > 800
                ? width * 0.4 - 150
                : width < 700
                  ? width * 0.8 - 150
                  : width * 0.5 - 150
            }
            height={
              width > 800
                ? width * 0.4 - 150
                : width < 700
                  ? width * 0.8 - 150
                  : width * 0.5 - 150
            }
            alt="olswel"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h1
              style={{
                fontSize: 56,
              }}
            >
              olswel.net
            </h1>
            <a href="www.soundcloud.com/olswel">www.soundcloud.com</a>
            <a href="https://open.spotify.com/artist/5aFfTz3PUiklCHbgz2Aylb?si=lkTC6RvfTPaR8oPccJQdYg">
              www.spotify.com
            </a>
            <a href="https://www.instagram.com/olswelolswel">
              www.instagram.com
            </a>
          </div>
        </div>
        {/*shit went here*/}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 50,
            marginTop: 24,
            marginBottom: 24,
          }}
        >
          <iframe
            src="https://olswel.sellfy.store/embed/product/dfihld/"
            width={100}
            height={100}
            allowTransparency={true}
            style={{ border: "none" }}
          ></iframe>
          <iframe
            src="https://olswel.sellfy.store/embed/product/6HDx/"
            width={100}
            height={100}
            allowTransparency={true}
            style={{ border: "none" }}
          ></iframe>
          <iframe
            src="https://olswel.sellfy.store/embed/product/hld8in/"
            width={100}
            height={100}
            allowTransparency={true}
            style={{ border: "none" }}
          ></iframe>
        </div>
        <div
          style={{
            alignSelf: "flex-start",
          }}
        >
          <input
            type="date"
            min={"2023-03-28"}
            max={today}
            onChange={(e) => {
              setDate(() => e.target.value);
              console.log(e.target.value);
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
              key={i * 19}
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
                transition: "0.5s",
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
                    {i === com.comment?.fakeTimestamp && (
                      <Image
                        src={"/westadam.png"}
                        width={10}
                        height={16}
                        key={k * 0.2}
                        alt="westadam"
                        style={{
                          position: "relative",
                          right: 3,
                          bottom: 0,
                          zIndex: 2005,
                        }}
                      />
                    )}
                    {(i === com.comment?.fakeTimestamp &&
                      showComment === com.comment?.fakeTimestamp) ||
                      (i === com.comment?.fakeTimestamp &&
                        i === timestamp &&
                        !showComment) ? (
                      <div
                        style={{
                          display: "flex",
                          position: "relative",
                          bottom: 10,
                          zIndex: 2000,
                          whiteSpace: "nowrap",
                        }}
                        key={k + 999}
                      >
                        <p
                          style={{
                            color: "orange",
                            display: "inline-block",
                          }}
                        >
                          {com.comment?.name}
                        </p>
                        <p
                          style={{
                            display: "inline-block",
                          }}
                        >
                          {com.comment?.name ? ": " : ""}
                          {com.comment?.comment}
                        </p>
                      </div>
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
              placeholder="yuor name"
              id="name"
              name="name"
              maxLength={14}
            />
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
