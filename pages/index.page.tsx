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

type Tag = {
  id: string;
  name: string;
  companyId: string;
};

type Blockchain = {
  id: string;
  name: string;
  companyId: string;
  acronym: string;
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
  const [searchVal, setSearchVal] = useState('');

  const generateCategories = (companies) => {
    const compObj = {
      blockchains: [],
      tags: [],
    };
    for (let i = 0; i < companies.length; i++) {
      compObj.blockchains = [
        ...compObj.blockchains,
        ...companies[i].blockchains.map((b) => b.name),
      ];
      compObj.tags = [
        ...compObj.tags,
        ...companies[i].tags.map((tag) => tag.name),
      ];
    }
    const newCategories = [];
    newCategories.push({
      id: 'blockchain',
      name: 'Blockchain',
      options: compObj.blockchains.map((b) => {
        return { value: b, label: b, checked: false };
      }),
    });
    newCategories.push({
      id: 'tags',
      name: 'Tags',
      options: compObj.tags.map((b) => {
        return { value: b, label: b, checked: false };
      }),
    });
    setCategories(newCategories);
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
    setSearchVal('');
    const filter = e.target.value;
    let newFilters = filters;
    if (newFilters.includes(filter)) {
      newFilters = newFilters.filter((f) => f !== filter);
    } else {
      newFilters.push(filter);
    }

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
      if (newFilters.every((f) => companyFilters.includes(f))) {
        filteredResults.push(companies[i]);
      }
    }
    setFilteredResults(filteredResults);
    setResults(filteredResults);
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row items-end justify-between mb-8">
        <h2 className="headline max-w-sm mx-auto md:max-w-[486px] md:mx-0 lg:w-full">
          Discover and learn about web3 companies
        </h2>
        <Search handleSearch={handleSearch} searchVal={searchVal} />
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <Filter handleFilter={handleFilter} categories={categories} />
        <div className="w-fit h-max mx-auto lg:grid-cols-2 grid-cols-1 md:mx-0 md:float-right md:grid">
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
