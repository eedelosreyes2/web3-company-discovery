import React, { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { hotjar } from 'react-hotjar'
import * as Fathom from 'fathom-client';

import prisma from "../lib/prisma";
import Layout from "../components/Layout";
import Search from "../components/Search";
import Teaser from "../components/Teaser";
import Filter from "../components/Filter";
declare const window: any;

export const getStaticProps: GetStaticProps = async () => {
    const companies = await prisma.company.findMany({
        where: { published: true },
        include: { links: true, blockchains: true, tags: true },
    });
    return { props: { companies } };
};

type Tag = {
    id: string;
    name: string;
    companies: CompanyProps[];
};

type Blockchain = {
    id: string;
    name: string;
    acronym: string;
    companies: CompanyProps[];
};

type CompanyProps = {
    id: string;
    name: string;
    description: string;
    about: string;
    email: string;
    url: string;
    logoUrl: string;
    links: Object[];
    blockchains: Blockchain[];
    tags: Tag[];
    published: boolean;
};

const Home: React.FC<{ companies: CompanyProps[] }> = ({ companies }) => {
    const [filteredResults, setFilteredResults] = useState([]);
    const [results, setResults] = useState(companies);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState([]);
    const [searchVal, setSearchVal] = useState("");
    const [menu, setMenu] = useState(false);

    useEffect(() => {
        // hotjar initialization
        hotjar.initialize(parseInt(process.env.NEXT_PUBLIC_HOTJAR_ID), parseInt(process.env.NEXT_PUBLIC_HOTJAR_SV))

        // Fathom analytics initialization
        Fathom.load(process.env.NEXT_PUBLIC_FATHOM_CODE, {
          includedDomains: ['web3discovery.me'],
        });

        // chatbot integration
        window.$crisp = [];
        window.CRISP_WEBSITE_ID = "891fbf71-baf0-45a5-ba16-22172bbd74cf";
        (() => {
            const d = document;
            const s = d.createElement("script");
            s.src = "https://client.crisp.chat/l.js";
            s.async = true;
            d.getElementsByTagName("body")[0].appendChild(s);
        })();
    }, []);

    const companyCategoryHelper = (
        section: Blockchain[] | Tag[],
        alreadyAdded: string[]
    ) => {
        return section
            .filter((s) => !alreadyAdded.includes(s.name))
            .map((s) => s.name);
    };

    const generateCategories = (companies: CompanyProps[]) => {
        const compObj = {
            blockchains: [],
            tags: [],
        };

        for (let i = 0; i < companies.length; i++) {
            compObj.blockchains = [
                ...compObj.blockchains,
                ...companyCategoryHelper(
                    companies[i].blockchains,
                    compObj.blockchains
                ),
            ];
            compObj.tags = [
                ...compObj.tags,
                ...companyCategoryHelper(companies[i].tags, compObj.tags),
            ];
        }
        const newCategories = [];
        newCategories.push({
            id: "blockchain",
            name: "Blockchain",
            options: compObj.blockchains.map((b) => {
                return { value: b, label: b, checked: false };
            }),
        });
        newCategories.push({
            id: "tags",
            name: "Tags",
            options: compObj.tags.map((b) => {
                return { value: b, label: b, checked: false };
            }),
        });
        setCategories(newCategories);
    };

    const updateCategories = (newFilters: string[]) => {
        const newCategories = [];
        while (categories.length) {
            const category = categories.pop();
            const newOptions = category.options.map(({ value, label }) => {
                return { value, label, checked: newFilters.includes(label) };
            });
            category.options = newOptions;
            newCategories.push(category);
        }
        setCategories(newCategories.reverse());
    };

    useEffect(() => {
        if (companies) {
            generateCategories(companies);
        }
    }, [companies]);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchVal(query);
        const searchPool = filters.length ? filteredResults : companies;
        const searchedCompanies = Object.values(searchPool).filter((val) =>
            val.name.toLowerCase().startsWith(query.toLowerCase())
        );
        setResults(searchedCompanies);
    };

    const handleFilter = (e) => {
        setSearchVal("");
        const filter = e.target.value;
        let newFilters = filters;
        if (newFilters.includes(filter)) {
            newFilters = newFilters.filter((f) => f !== filter);
        } else {
            newFilters.push(filter);
        }

        updateCategories(newFilters);
        setFilters(newFilters);
        if (!newFilters.length) {
            setResults(companies);
            return;
        }

        const filteredResults = [];
        for (let i = 0; i < companies.length; i++) {
            const companyFilters = [
                ...companies[i].tags.map((t) => t.name),
                ...companies[i].blockchains.map((b) => b.name),
            ];
            if (newFilters.some((f) => companyFilters.includes(f))) {
                filteredResults.push(companies[i]);
            }
        }
        setFilteredResults(filteredResults);
        setResults(filteredResults);
    };

    return (
        <Layout>
            <div className="flex flex-col md:flex-row justify-between md:mb-12">
                <h2 className="headline md:max-w-[486px]">
                    Discover and learn <br />
                    about web3 companies
                </h2>

                <Search handleSearch={handleSearch} searchVal={searchVal} />
            </div>
            <div className="flex flex-col md:flex-row justify-between">
                <div className="w-full flex justify-end py-6 text-slate-400 md:hidden">
                    <div
                        onClick={() => setMenu(!menu)}
                        className="cursor-pointer w-24 flex justify-between items-center text-white text-sm p-2 pl-4 border border-slate-600 rounded"
                    >
                        Filter
                        {menu ? (
                            <ChevronUpIcon className="h-5 w-5" />
                        ) : (
                            <ChevronDownIcon className="h-5 w-5" />
                        )}
                    </div>
                </div>
                <Filter
                    display={menu}
                    handleFilter={handleFilter}
                    categories={categories}
                />
                <div className="h-max mx-auto grid grid-cols-1 gap-6 md:mx-0 md:float-right md:grid md:grid-cols-2 md:gap-6">
                    {results &&
                        results
                            .sort((a, b) => a["name"].localeCompare(b["name"]))
                            .map((company) => (
                                <Teaser key={company.id} company={company} />
                            ))}
                </div>
            </div>
        </Layout>
    );
};

export default Home;
