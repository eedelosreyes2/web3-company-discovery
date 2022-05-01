import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import prisma from '../lib/prisma';
import Layout from '../components/Layout';
import Search from '../components/Search';
import Teaser from '../components/Teaser';

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

  const handleSearch = (e) => {
    const query = e.target.value;
    const searchedCompanies = Object.values(companies).filter((val) =>
      val.name.toLowerCase().startsWith(query.toLowerCase())
    );
    setResults(searchedCompanies);
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <h2 className="headline">Discover and learn about web3 companies</h2>
        <Search handleSearch={handleSearch} />
      </div>
      <div className="w-fit mx-auto md:float-right md:grid grid-cols-2 gap-5">
        {results &&
          results.map((company) => (
            <Teaser key={company.id} company={company} />
          ))}
      </div>
    </Layout>
  );
};

export default Home;
