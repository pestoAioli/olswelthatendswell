import Head from "next/head";
import Image from "next/image";
import styles from "@component/styles/Home.module.css";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useHover } from "react-aria";
import moment from "moment";
import Script from "next/script";
import Link from "next/link";
import { timeStamp } from "console";

enum LINKS {
  link1 = "https://media.tenor.com/Ag7VvFqfDIIAAAAC/jgc-spongebob.gif",
  link2 = "https://media.tenor.com/nYvFGxkMAMwAAAAC/dog-walk.gif",
  link3 = "https://media.discordapp.net/attachments/625161614533853242/924556863708733501/3dgifmaker18738.gif",
  link4 = "https://media.tenor.com/CkObCaBFiUoAAAAd/monkey-makeup.gif",
  link5 = "https://media.tenor.com/FfBSz0tmGqsAAAAC/dress-color.gif",
  link6 = "https://media.tenor.com/USPznVgzIIIAAAAd/cat-dance.gif",
  link7 = "https://media.discordapp.net/attachments/615515996458844160/1008657331355127808/watermark.gif",
  link8 = "https://media.tenor.com/bUyhhbdRezIAAAAC/moon-bugman.gif",
  link9 = "https://media.tenor.com/ss2YVzmsERQAAAAC/noob-banana-dancing.gif",
  link10 = "https://media.discordapp.net/attachments/615515996458844160/1008657331355127808/watermark.gif",
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
// const today = new Date().toISOString().slice(0, 10);
const today = moment().format().slice(0, 10);
export default function Home({ products }: any) {
  const { hoverProps, isHovered } = useHover({
    onHoverStart: (e) => {
      console.log(e.target.id)
      setHoverer(e.target.id)
    },
  });
  const elementRef = useRef(null);
  const [timestamp, setTimestamp] = useState(null);
  const [date, setDate] = useState(today);
  const [width, setWidth] = useState(null);
  const [showComment, setShowComment] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [updateComments, setUpdateComments] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [picId, setPicId] = useState('');
  const [hoverer, setHoverer] = useState('');
  const [bars, setBars] = useState(() => {
    const bars = [];
    for (let i = 0; i < 160; i++) {
      bars.push(randomInteger(30, 60));
    }
    return bars;
  });
  const [smolBars, setSmolBars] = useState(() => {
    const bars = [];
    for (let i = 0; i < 160; i++) {
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
    timeStampTaken.current = comments.map((com) => {
      return com.comment?.fakeTimestamp;
    });
  });
  // useEffect(() => {
  //   if (elementRef.current) {
  //     console.log(elementRef, "woooooorking");
  //     elementRef.current.scrollLeft = 0;
  //   } else {
  //     console.log(elementRef, "noooot work");
  //   }
  // }, [width]);
  useEffect(() => {
    // setComments([{
    //   comment: {
    //     name: 'bob',
    //     fakeTimestamp: 8,
    //     comment: "asdfsdfasdfasdf asdfasdfas asdfa"
    //   }
    // },
    // {
    //   comment: {
    //     name: 'bob',
    //     fakeTimestamp: 28,
    //     comment: "asdfsdfasdfasdf asdfasdfas asdfa"
    //   }
    // },
    // {
    //   comment: {
    //     name: 'bob',
    //     fakeTimestamp: 18,
    //     comment: "asdfsdfasdfasdf asdfasdfas asdfa"
    //   }
    // }, {
    //   comment: {
    //     name: 'bob',
    //     fakeTimestamp: 150,
    //     comment: "123412341234asdfsdfasdfasdf asdfasdfas asd"
    //   }
    // }, {
    //   comment: {
    //     name: 'bob',
    //     fakeTimestamp: 180,
    //     comment: "123412341234asdfsdfasdfasdf asdfasdfas asd"
    //   }
    // }])
    console.log(timeStampTaken, "today");
    console.log(moment().format());
    timeStampTaken.current = comments.map((com) => {
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

  function clearPreviousImageStyles() {
    const images = document.querySelectorAll('img');
    for (const image of images) {
      image.removeAttribute('style');
    }
  }

  useEffect(() => {
    if (document.getElementById(picId) != null) {
      document.getElementById(picId).style.setProperty("border", "2px solid red")
      console.log(picId)
    }
  }, [picId])

  async function addAComment(e) {
    e.preventDefault();
    setDisabled(true);
    const data = {
      comment: e.target.comment.value,
      timestamp: date,
      fakeTimestamp: timestamp ? timestamp : randomInteger(1, 60),
      name: e.target.name.value,
      avatar: e.target.avatar.value ? e.target.avatar.value : null,
    };
    if (timeStampTaken.current.includes(data.fakeTimestamp)) {
      console.log(timeStampTaken.current);

      e.target.comment.value = "";
      e.target.comment.name = "";
      return alert("someone already left a comment at that timestamp rawrXD");
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
    setShowModal(false);
    setUpdateComments(!updateComments);
    setTimeout(() => {
      setDisabled(false);
    }, 2000);
    return result;
  }
  if (!width) {
    return <h1>Loading....</h1>;
  } else {
    return (
      <>
        <Head>
          <title>olswel (╬ ಠ益ಠ)</title>
          <meta name="description" content="olswel" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:site_name" content="olswel" />
          <meta property="og:description" content="olswel" />
          <meta
            content="olswel, record, sounds, share, sound, audio, tracks, music, soundcloud, soundcloudhero, hero"
            name="keywords"
          />
          <meta property="og:url" content="https://www.olswel.net" />
          <meta property="og:image" content="/olswellogo.png" />
          <link rel="icon" href="/olswellogo.png" />
        </Head>
        <Script src="https://sellfy.com/js/api_buttons.js%22%3E" />
        <main
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          ref={elementRef}
        >
          <div
            style={{
              marginTop: 24,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{
                display: "flex",
              }}>
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
                <div style={{
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "column",
                }}
                >
                  <h1
                    style={{
                      fontSize: width < 700 ? 48 : 56,
                      marginBottom: 0,
                    }}
                  >
                    olswel.net
                  </h1>
                  <Link href="https://soundcloud.com/olswel">
                    www.soundcloud.com
                  </Link>
                  <Link href="https://open.spotify.com/artist/5aFfTz3PUiklCHbgz2Aylb?si=lkTC6RvfTPaR8oPccJQdYg">
                    www.spotify.com
                  </Link>
                  <Link href="https://www.instagram.com/olswelolswel">
                    www.instagram.com
                  </Link>
                  {width > 700 ?
                    <iframe src="https://olswel.sellfy.store/embed/product/bulyuz/" style={{
                      border: "none",
                      overflowY: "hidden",
                      fontSize: "12px",
                      height: 500,
                      marginTop: 12,
                      marginBottom: "-30px"
                    }}
                    ></iframe>
                    : null
                  }
                </div>
              </div>
              {width < 700 ?
                <iframe src="https://olswel.sellfy.store/embed/product/bulyuz/" style={{
                  border: "none",
                  overflowY: "hidden",
                  fontSize: "12px",
                  height: 500,
                  marginTop: 12,
                  marginBottom: "-30px"
                }}
                ></iframe>
                : null
              }
            </div>
          </div>
          {/*shit went here*/}
          <div>

          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "5vw",
              marginBottom: 24,
            }}
          >
            <iframe
              src="https://olswel.sellfy.store/embed/product/dfihld/"
              style={{
                border: "none",
                overflowY: "hidden",
                fontSize: "12px",
                height: 250,
                width: 105,
              }}
            ></iframe>
            <iframe
              src="https://olswel.sellfy.store/embed/product/6HDx/"
              style={{
                border: "none",
                overflow: "hidden",
                height: 250,
                width: 105,
              }}
            ></iframe>
            <iframe
              src="https://olswel.sellfy.store/embed/product/hld8in/"
              style={{
                border: "none",
                overflow: "hidden",
                height: 200,
                width: 105,
              }}
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
              gap: 1,
            }}
            className={styles.pee}
          >
            {bars.map((bar, i) => (
              <div
                {...hoverProps}
                key={i * 19}
                id={`${i}`}
                style={{
                  width: "0.39vw",
                  position: "relative",
                  cursor: "pointer",
                  marginTop: bar,
                  minHeight: 70,
                  backgroundColor:
                    isHovered && hoverer && i >= Number(hoverer) && i <= timestamp
                      ? "orange"
                      : timestamp !== null && isHovered && hoverer && i <= Number(hoverer) && i <= timestamp
                        ? "darkorange"
                        : timestamp !== null && i <= timestamp
                          ? "darkorange"
                          : isHovered && timestamp !== null && hoverer && i <= Number(hoverer)
                            ? "orange"
                            : "gray",
                  transition: "0.1s"
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
              gap: 1,
              marginTop: 1,
            }}
          >
            {smolBars.map((bar, i) => (
              <div
                key={i}
                className={styles.poop}
                style={{
                  width: "0.39vw",
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
                          src={
                            com.comment?.avatar
                              ? com.comment.avatar
                              : "/westadam.png"
                          }
                          width={16}
                          height={24}
                          key={k * 0.2}
                          alt="westadam"
                          style={{
                            position: "relative",
                            right: 3,
                            bottom: 0,
                            zIndex: 12005,
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
                            position: "relative",
                            zIndex: 2000,
                            direction: i < 100 ? "ltr" : "rtl"
                          }}
                          key={k + 999}
                        >
                          {i < 100 ? (
                            <span style={{
                              display: "block",
                              width: width < 400 ? "200px" : "400px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              color: "orangered"
                            }}>{com.comment?.name}{" "}<span style={{ color: "black" }}>{com.comment?.comment}</span></span>
                          ) : (
                            <span style={{
                              display: "block",
                              width: width < 400 ? "200px" : "400px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              direction: "rtl"
                            }}>{com.comment?.comment}{" "}<span style={{ color: "orangered" }}>{com.comment?.name}</span></span>
                          )}
                        </div >
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
              display: "flex",
            }}
          >
            <button
              onClick={() => {
                setShowModal(!showModal);
              }}
            >
              {showModal ? "close" : "choose yuor avatar"} 🤓
            </button>
            <form
              className={styles.formForNewSpot}
              onSubmit={addAComment}
              method="post"
              encType="application/json"
            >
              {showModal ? (
                <div style={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap" }}>
                  <label>
                    <Image
                      src="https://media.tenor.com/Ag7VvFqfDIIAAAAC/jgc-spongebob.gif"
                      alt="spunchbob"
                      width={40}
                      height={40}
                      id="1"
                      onClick={() => {
                        clearPreviousImageStyles();
                        setPicId("1")
                      }}
                    />
                    <input type="radio" name="avatar" value={LINKS.link1} />
                  </label>
                  <label>
                    <Image
                      src="https://media.tenor.com/nYvFGxkMAMwAAAAC/dog-walk.gif"
                      alt="dog"
                      width={40}
                      height={40}
                      id="2"
                      onClick={() => {
                        clearPreviousImageStyles();
                        setPicId("2")
                      }}
                    />
                    <input type="radio" name="avatar" value={LINKS.link2} />
                  </label>
                  <label>
                    <Image
                      src="https://media.discordapp.net/attachments/625161614533853242/924556863708733501/3dgifmaker18738.gif"
                      alt="dog"
                      width={40}
                      height={40}
                      id="3"
                      onClick={() => {
                        clearPreviousImageStyles();
                        setPicId("3")
                      }}
                    />
                    <input type="radio" name="avatar" value={LINKS.link3} />
                  </label>
                  <label>
                    <Image
                      src="https://media.tenor.com/CkObCaBFiUoAAAAd/monkey-makeup.gif"
                      alt="dog"
                      width={40}
                      height={40}
                      id="4"
                      onClick={() => {
                        clearPreviousImageStyles();
                        setPicId("4")
                      }}
                    />
                    <input type="radio" name="avatar" value={LINKS.link4} />
                  </label>
                  <label>
                    <Image
                      src="https://media.tenor.com/FfBSz0tmGqsAAAAC/dress-color.gif"
                      alt="dog"
                      width={40}
                      height={40}
                      id="5"
                      onClick={() => {
                        clearPreviousImageStyles();
                        setPicId("5")
                      }}
                    />
                    <input type="radio" name="avatar" value={LINKS.link5} />
                  </label>
                  <label>
                    <Image
                      src="https://media.tenor.com/USPznVgzIIIAAAAd/cat-dance.gif"
                      alt="dog"
                      width={40}
                      height={40}
                      id="6"
                      onClick={() => {
                        clearPreviousImageStyles();
                        setPicId("6")
                      }}
                    />
                    <input type="radio" name="avatar" value={LINKS.link6} />
                  </label>
                  <label>
                    <Image
                      src="https://media.discordapp.net/attachments/615515996458844160/1008657331355127808/watermark.gif"
                      alt="dog"
                      width={40}
                      height={40}
                      id="7"
                      onClick={() => {
                        clearPreviousImageStyles();
                        setPicId("7")
                      }}
                    />
                    <input type="radio" name="avatar" value={LINKS.link7} />
                  </label>
                  <label>
                    <Image
                      src="https://media.tenor.com/bUyhhbdRezIAAAAC/moon-bugman.gif"
                      alt="dog"
                      width={40}
                      height={40}
                      id="8"
                      onClick={() => {
                        clearPreviousImageStyles();
                        setPicId("8")
                      }}
                    />
                    <input type="radio" name="avatar" value={LINKS.link8} />
                  </label>
                  <label>
                    <Image
                      src="https://media.tenor.com/ss2YVzmsERQAAAAC/noob-banana-dancing.gif"
                      alt="dog"
                      width={40}
                      height={40}
                      id="9"
                      onClick={() => {
                        clearPreviousImageStyles();
                        setPicId("9")
                      }}
                    />
                    <input type="radio" name="avatar" value={LINKS.link9} />
                  </label>
                  <label>
                    <Image
                      src="https://media.tenor.com/vbERgHqJfKMAAAAd/troll-troll-face.gif"
                      alt="dog"
                      width={40}
                      height={40}
                      id="10"
                      onClick={() => {
                        clearPreviousImageStyles();
                        setPicId("10")
                      }}
                    />
                    <input type="radio" name="avatar" value={LINKS.link10} />
                  </label>
                </div>
              ) : null}
              <input
                type="text"
                placeholder="yuor name"
                id="name"
                name="name"
                maxLength={14}
                required
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
              <button type="submit" disabled={disabled}>
                Submit
              </button>
            </form>
          </div>
        </main >
      </>
    );
  }
}
