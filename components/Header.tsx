import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { typeform } from "../pages/data";

const Header: React.FC = () => {
    const router = useRouter();
    const isActive: (pathname: string) => boolean = (pathname) =>
        router.pathname === pathname;

    return (
        <nav className="flex justify-between items-center py-10 mx-auto md:max-w-full md:mx-0">
            <Link href="/">
                <a className="bold" data-active={isActive("/")}>
                    <svg
                        width="30"
                        height="40"
                        viewBox="0 0 30 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19.2857 22.4L30 28.8L11.25 40L0 33.6L19.2857 22.4Z"
                            fill="url(#paint0_linear_337_87)"
                        />
                        <path
                            d="M4.95686e-07 11.2L11.25 17.6V40L0 33.6L4.95686e-07 11.2Z"
                            fill="url(#paint1_linear_337_87)"
                        />
                        <path
                            d="M19.2856 0L29.9999 6.4V28.8L19.2856 22.4V0Z"
                            fill="url(#paint2_linear_337_87)"
                        />
                        <path
                            d="M19.2857 0L30 6.4L11.25 17.6L0 11.2L19.2857 0Z"
                            fill="url(#paint3_linear_337_87)"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_337_87"
                                x1="-0.000590501"
                                y1="31.2022"
                                x2="30.0001"
                                y2="31.2022"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#5433FF" />
                                <stop offset="0.5" stopColor="#20BDFF" />
                                <stop offset="1" stopColor="#A5FECB" />
                            </linearGradient>
                            <linearGradient
                                id="paint1_linear_337_87"
                                x1="-0.000221438"
                                y1="25.6036"
                                x2="11.2501"
                                y2="25.6036"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#5433FF" />
                                <stop offset="0.5" stopColor="#20BDFF" />
                                <stop offset="1" stopColor="#A5FECB" />
                            </linearGradient>
                            <linearGradient
                                id="paint2_linear_337_87"
                                x1="19.2854"
                                y1="14.4036"
                                x2="30"
                                y2="14.4036"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#5433FF" />
                                <stop offset="0.5" stopColor="#20BDFF" />
                                <stop offset="1" stopColor="#A5FECB" />
                            </linearGradient>
                            <linearGradient
                                id="paint3_linear_337_87"
                                x1="-0.0005905"
                                y1="8.80219"
                                x2="30.0001"
                                y2="8.80219"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#5433FF" />
                                <stop offset="0.5" stopColor="#20BDFF" />
                                <stop offset="1" stopColor="#A5FECB" />
                            </linearGradient>
                        </defs>
                    </svg>
                </a>
            </Link>
            <Link href={typeform}>
                <a
                    className="bold text-slate-400 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-active={isActive("/")}
                >
                    Submit Project
                </a>
            </Link>
        </nav>
    );
};

export default Header;
