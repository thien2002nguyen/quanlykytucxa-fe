import { baseURL } from "@/config/axios";
import { Metadata } from "next";
import Head from "next/head";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

const fetchAPi = async (slug: string): Promise<any> => {
  const url = `${baseURL}/api/infomations/${slug}`;
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { params } = props;
  const infomation: any = await fetchAPi(params.slug);

  if (infomation.statusCode === 404) return notFound();

  return {
    title: infomation?.data?.title || "Thông tin",
    description: infomation?.data?.description,
    keywords: [infomation?.data?.description],
    openGraph: {
      images: infomation?.data?.image,
      type: "article",
      title: infomation?.data?.title,
      description: infomation?.data?.description,
      locale: "vi",
    },
  };
};

const InfomationLayout = async ({
  children,
  params,
}: Props & { children: React.ReactNode }) => {
  const infomation: any = await fetchAPi(params.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Infomation",
    name: infomation?.data?.title,
    image: infomation?.data?.image,
    description: infomation?.data?.description,
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
          key="infomation-jsonld"
        >
          {JSON.stringify(jsonLd)}
        </script>
      </Head>
      {children}
    </>
  );
};

export default InfomationLayout;
