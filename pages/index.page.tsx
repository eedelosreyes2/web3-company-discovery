import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';

import prisma from '../lib/prisma';
import Layout from '../components/Layout';
import Search from '../components/Search';
import Teaser from '../components/Teaser';
import Filter from '../components/Filter';

export const getStaticProps: GetStaticProps = async () => {
    const companies = await prisma.company.findMany({
        where: { published: true },
        include: { links: true, blockchains: true, tags: true },
    });
    return { props: { companies } };
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
    blockchains: Object[];
    tags: Object[];
    published: boolean;
};

const Home: React.FC<{ companies: CompanyProps[] }> = ({ companies }) => {
    const [results, setResults] = useState(companies);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState([]);

    useEffect(() => {

        if (companies) {

        }
    }, [companies])

    const handleSearch = (e) => {
        const query = e.target.value;
        const searchedCompanies = Object.values(companies).filter((val) =>
            val.name.toLowerCase().startsWith(query.toLowerCase())
        );
        setResults(searchedCompanies);
    };

    const handleFilter = (e) => {
        console.log(companies)
        const filter = e.target.value;
        let newFilters = filters
        if (newFilters.includes(filter)) {
            newFilters = newFilters.filter(f => f !== filter)
        } else {
            newFilters.push(filter)
        }
        setFilters(newFilters)
        const filteredResults = []
        for (let i = 0; i < companies.length; i++) {
            const companyFilters = [...companies[i].tags, ...companies[i].blockchains]
            if (companyFilters.some(f => newFilters.includes(f))) {
                filteredResults.push(companies[i])
            }
        }
        setResults(filteredResults)
    };

    return (
        <Layout>
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                <h2 className="headline">Discover and learn about web3 companies</h2>
                <Search handleSearch={handleSearch} />
            </div>
            <div className='flex flex-row'>
                <Filter handleFilter={handleFilter} categories={categories}  />
                <div className="w-fit mx-auto md:float-right md:grid grid-cols-2 gap-5">
                    {results &&
                        results.map((company) => (
                            <Teaser key={company.id} company={company} />
                        ))}
                </div>
            </div>
        </Layout>
    );
};

export default Home;
