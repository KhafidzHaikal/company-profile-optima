import { setRequestLocale, getTranslations } from "next-intl/server";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";

type Props = {
    params?: Promise<{ locale: string }>;
};

export default async function AbuDhabuPage({ params }: Props) {
    const resolvedParams = params ? await params : { locale: "en" }; // default fallback

    const { locale } = resolvedParams;
    setRequestLocale(locale);
    const t = await getTranslations({ locale });

    return (
        <main className="mt-12 lg:mt-0">
            <Navbar />
            <section className="py-12 mx-12 lg:mx-32 lg:mt-12">
                <p className="text-3xl font-bold text-yellow-400">Abu Dhabi</p>
                <p className="text-md mt-8 mb-8">{t("abu-dhabi-subtitle-destination")}</p>
                <Link href={"https://wa.me/971558445448"}>
                    <Button className="mt-4 mb-8 rounded-md py-4 flex items-center gap-2  text-black bg-[#F3C623] border-2 border-black hover:bg-[#f4e19d] cursor-pointer">
                        {t("dubai-text-button")}
                        <FaWhatsapp className="text-md" />
                    </Button>
                </Link>
                <div className="hidden lg:block">
                    <div className="md:flex justify-between gap-4 items-center">
                        <div className="md:w-1/2">
                            <p className="text-2xl font-bold text-yellow-400">
                                {t("abu-dhabi-destination.title-1")}
                            </p>
                            <p className="text-md mt-8">{t("abu-dhabi-destination.desc-1")}</p>
                        </div>
                        <Image
                            src={"/images/mosque.png"}
                            alt={`Optima Portfolio`}
                            width={300}
                            height={100}
                            className="w-1/3 rounded-lg object-cover"
                        />
                    </div>
                    <div className="md:flex justify-between gap-4 items-center">
                        <Image
                            src={"/images/Qasr-Al-Watan.png"}
                            alt={`Optima Portfolio`}
                            width={300}
                            height={100}
                            className="w-1/3 rounded-lg object-cover"
                        />
                        <div className="md:w-1/2 text-right">
                            <p className="text-2xl font-bold text-yellow-400">
                                {t("abu-dhabi-destination.title-2")}
                            </p>
                            <p className="text-md mt-8">{t("abu-dhabi-destination.desc-2")}</p>
                        </div>
                    </div>
                    <div className="md:flex justify-between gap-4 items-center">
                        <div className="md:w-1/2">
                            <p className="text-2xl font-bold text-yellow-400">
                                {t("abu-dhabi-destination.title-3")}
                            </p>
                            <p className="text-md mt-8">{t("abu-dhabi-destination.desc-3")}</p>
                        </div>
                        <Image
                            src={"/images/lova-abuhabi.jpg"}
                            alt={`Optima Portfolio`}
                            width={300}
                            height={100}
                            className="w-1/3 rounded-lg object-cover"
                        />
                    </div>
                    <div className="md:flex justify-between gap-4 items-center">
                        <Image
                            src={"/images/Corniche-Sightseeing.jpg"}
                            alt={`Optima Portfolio`}
                            width={300}
                            height={100}
                            className="w-1/3 rounded-lg object-cover"
                        />
                        <div className="md:w-1/2 text-right">
                            <p className="text-2xl font-bold text-yellow-400">
                                {t("abu-dhabi-destination.title-4")}
                            </p>
                            <p className="text-md mt-8">{t("abu-dhabi-destination.desc-4")}</p>
                        </div>
                    </div>
                    <div className="md:flex justify-between gap-4 items-center">
                        <div className="md:w-1/2">
                            <p className="text-2xl font-bold text-yellow-400">
                                {t("abu-dhabi-destination.title-5")}
                            </p>
                            <p className="text-md mt-8">{t("abu-dhabi-destination.desc-5")}</p>
                        </div>
                        <Image
                            src={"/images/Desa-Warisan.png"}
                            alt={`Optima Portfolio`}
                            width={300}
                            height={100}
                            className="w-1/3 rounded-lg object-cover"
                        />
                    </div>
                </div>
                <div className="block lg:hidden">
                    <div className="mb-12 mt-12">
                        <div className="">
                            <p className="text-2xl font-bold text-yellow-400">
                                {t("abu-dhabi-destination.title-1")}
                            </p>
                            <p className="text-md mt-8">{t("abu-dhabi-destination.desc-1")}</p>
                        </div>
                        <Image
                            src={"/images/mosque.png"}
                            alt={`Optima Portfolio`}
                            width={300}
                            height={100}
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <div className="mb-12">
                        <div className="t">
                            <p className="text-2xl font-bold text-yellow-400">
                                {t("abu-dhabi-destination.title-2")}
                            </p>
                            <p className="text-md mt-8">{t("abu-dhabi-destination.desc-2")}</p>
                        </div>
                        <Image
                            src={"/images/Qasr-Al-Watan.png"}
                            alt={`Optima Portfolio`}
                            width={300}
                            height={100}
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <div className="mb-12">
                        <div className="">
                            <p className="text-2xl font-bold text-yellow-400">
                                {t("abu-dhabi-destination.title-3")}
                            </p>
                            <p className="text-md mt-8">{t("abu-dhabi-destination.desc-3")}</p>
                        </div>
                        <Image
                            src={"/images/lova-abuhabi.jpg"}
                            alt={`Optima Portfolio`}
                            width={300}
                            height={100}
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <div className="mb-12">
                        <div className="">
                            <p className="text-2xl font-bold text-yellow-400">
                                {t("abu-dhabi-destination.title-4")}
                            </p>
                            <p className="text-md mt-8">{t("abu-dhabi-destination.desc-4")}</p>
                        </div>
                        <Image
                            src={"/images/Corniche-Sightseeing.jpg"}
                            alt={`Optima Portfolio`}
                            width={300}
                            height={100}
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <div className="mb-12">
                        <div className="">
                            <p className="text-2xl font-bold text-yellow-400">
                                {t("abu-dhabi-destination.title-5")}
                            </p>
                            <p className="text-md mt-8">{t("abu-dhabi-destination.desc-5")}</p>
                        </div>
                        <Image
                            src={"/images/Desa-Warisan.png"}
                            alt={`Optima Portfolio`}
                            width={300}
                            height={100}
                            className="rounded-lg object-cover"
                        />
                    </div>
                </div>
            </section>
            <section
                className="py-12 mx-12 lg:mx-32 lg:mt-12 rounded-md p-8 mb-12"
                id="background-yellow">
                <p className="text-3xl font-bold text-black">{t("dubai-footer")}</p>
                <p className="text-md mt-4 text-black">{t("dubai-footer-desc")}</p>
                <Link href={"https://wa.me/971558445448"}>
                    <Button className="mt-8 rounded-md py-4 flex items-center gap-2  text-black bg-[#F3C623] hover:bg-[#f4e19d] border-2 border-black cursor-pointer">
                        {t("dubai-text-button")}
                        <FaWhatsapp className="text-md" />
                    </Button>
                </Link>
            </section>
            <Footer />
        </main>
    );
}
