import Image from "next/image";
import Link from "next/link";

export function TopOfPage({ width }) {
  return (
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
  )
}
