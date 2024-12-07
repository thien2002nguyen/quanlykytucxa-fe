import React from "react";
import "./style.scss";
import { Flex } from "antd";
import Image from "next/image";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Import ngôn ngữ tiếng Việt
import { FcCalendar } from "react-icons/fc";
import Link from "next/link";
import { IMAGE_DEFAULT_NOTIFICATION } from "@/utils/contants";

dayjs.locale("vi"); // Thiết lập ngôn ngữ tiếng Việt

interface Props {
  thumbnail: string;
  title: string;
  createdAt: string;
  description: string;
  slug: string;
  typeCard: "thong-tin" | "tin-tuc";
}

const InfomationOrNewsCard = ({
  thumbnail = IMAGE_DEFAULT_NOTIFICATION,
  title,
  createdAt,
  description,
  slug,
  typeCard,
}: Props) => {
  return (
    <Link
      href={`/${typeCard}/${slug}`}
      className="link-card-infomation-or-news"
    >
      <Flex gap={8} className="wrapper-infomation-or-news-card">
        <div className="wrapper-infomation-or-news-card-image">
          <Image
            src={thumbnail}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            priority
            sizes="100%"
          />
        </div>

        <div className="wrapper-infomation-or-news-card-content">
          <p className="wrapper-infomation-or-news-card-content-title">
            {title}
          </p>

          <p className="wrapper-infomation-or-news-card-content-time">
            <FcCalendar />
            <span>{dayjs(createdAt).format("dddd, DD/MM/YYYY - HH:mm")}</span>
          </p>

          <p className="wrapper-infomation-or-news-card-content-description">
            {description}
          </p>
        </div>
      </Flex>
    </Link>
  );
};

export default InfomationOrNewsCard;
