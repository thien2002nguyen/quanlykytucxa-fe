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
  const url = `${baseURL}/api/news/${slug}`;
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
  const news: any = await fetchAPi(params.slug);

  if (news.statusCode === 404) return notFound();

  return {
    title: news?.data?.title || "Tin tức",
    description: news?.data?.description,
    keywords: [news?.data?.description],
    openGraph: {
      images: news?.data?.image,
      type: "article",
      title: news?.data?.title,
      description: news?.data?.description,
      locale: "vi",
    },
  };
};

const NewsLayout = async ({
  children,
  params,
}: Props & { children: React.ReactNode }) => {
  const news: any = await fetchAPi(params.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "News",
    name: news?.data?.title,
    image: news?.data?.image,
    description: news?.data?.description,
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
          key="news-jsonld"
        >
          {JSON.stringify(jsonLd)}
        </script>
      </Head>
      {children}
    </>
  );
};

export default NewsLayout;
