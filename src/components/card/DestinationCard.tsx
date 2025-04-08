"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type DestinationCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  className?: string;
};

export default function DestinationCard({
  title,
  description,
  imageUrl,
  link,
  className
}: DestinationCardProps) {
  const t = useTranslations();
  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden min-h-[300px] lg:min-h-[380px] flex items-end text-white mt-4",
        className
      )}
    >
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover object-center"
        quality={90}
        priority
      />
      <div className="absolute inset-0 bg-black/25" />
      <div className="relative z-10 p-6 lg:p-8">
        <h2 className="text-2xl lg:text-3xl font-bold mb-2">{title}</h2>
        <p className="text-sm lg:text-base mb-4 max-w-2xl">{description}</p>
        <Link
          href={link}
          className="inline-flex items-center gap-2 bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition"
        >
          {t("learn-more")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
