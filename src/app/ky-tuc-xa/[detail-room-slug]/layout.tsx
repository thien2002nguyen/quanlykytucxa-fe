import { baseURL } from "@/config/axios";
import { Metadata } from "next";
import Head from "next/head";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    "detail-room-slug": string;
  };
};

const fetchAPi = async (slug: string): Promise<any> => {
  const url = `${baseURL}/rooms/${slug}`;
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    return null;
  }
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { params } = props;
  const room: any = await fetchAPi(params["detail-room-slug"]);

  if (room.messageCode === "ROOM_NOT_FOUND") return notFound();

  return {
    title:
      `${room?.data?.roomName} | ${room?.data?.floor} - ${room?.data?.roomBlockId?.name}` ||
      "Chi tiết phòng",
    description: room?.data?.description,
    keywords: [room?.data?.description],
    openGraph: {
      images: room?.data?.thumbnail,
      type: "article",
      title: `${room?.data?.roomName} | ${room?.data?.floor} - ${room?.data?.roomBlockId?.name}`,
      description: room?.data?.description,
      locale: "vi",
    },
  };
};

const DetailLayout = async ({
  children,
  params,
}: Props & { children: React.ReactNode }) => {
  const room: any = await fetchAPi(params["detail-room-slug"]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Room",
    name: `${room?.data?.roomName} | ${room?.data?.floor} - ${room?.data?.roomBlockId?.name}`,
    image: room?.data?.thumbnail,
    description: room?.data?.description,
    sku: "",
    offers: {
      "@type": "Offer",
      price: "",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <Head>
        {/* Thêm các meta tags khác nếu cần */}
        {/* https://nextjs.org/learn-pages-router/seo/rendering-and-ranking/metadata */}
        <script
          type="application/ld+json"
          // dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          key="room-jsonld"
        >
          {JSON.stringify(jsonLd)}
        </script>
      </Head>
      {children}
    </>
  );
};

export default DetailLayout;
