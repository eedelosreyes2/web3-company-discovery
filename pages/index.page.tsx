import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
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
  const [searchVal, setSearchVal] = useState('');
  const [menu, setMenu] = useState(false);

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
        ...companyCategoryHelper(companies[i].blockchains, compObj.blockchains),
      ];
      compObj.tags = [
        ...compObj.tags,
        ...companyCategoryHelper(companies[i].tags, compObj.tags),
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
    setSearchVal('');
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
      if (newFilters.every((f) => companyFilters.includes(f))) {
        filteredResults.push(companies[i]);
      }
    }
    setFilteredResults(filteredResults);
    setResults(filteredResults);
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between mb-6 md:mb-12">
        <h2 className="headline md:max-w-[486px]">
          Discover and learn <br />
          about web3 companies
        </h2>
        <div
          onClick={() => setMenu(!menu)}
          className="col-responsive w-full flex justify-center py-4 mt-6 cursor-pointer text-slate-400 md:hidden"
        >
          {menu ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </div>
        <Search
          display={menu}
          handleSearch={handleSearch}
          searchVal={searchVal}
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <Filter
          display={menu}
          handleFilter={handleFilter}
          categories={categories}
        />
        <div className="h-max mx-auto grid grid-cols-1 gap-6 md:mx-0 md:float-right md:grid md:grid-cols-2 md:gap-6">
          {results &&
            results
              .sort((a, b) => a['name'].localeCompare(b['name']))
              .map((company) => <Teaser key={company.id} company={company} />)}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
