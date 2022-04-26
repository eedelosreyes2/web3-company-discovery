import React from 'react';
import { GetStaticProps } from 'next';
import prisma from '../lib/prisma';
import Layout from '../components/Layout';
import CompanyTeaser, { CompanyTeaserProps } from '../components/CompanyTeaser';

export const getStaticProps: GetStaticProps = async () => {
  const companies = await prisma.company.findMany({
    where: { published: true },
    include: { links: true, tags: true },
  });
  return { props: { companies } };
};

type Props = {
  companies: CompanyTeaserProps[];
};

const Feed: React.FC<Props> = ({ companies }) => {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between">
        <h1 className="text-2xl font-bold font-black pb-3">
          Discover and learn about web3 companies
        </h1>
        <div>*Search bar component*</div>
      </div>
      <div className="w-fit mx-auto md:float-right md:grid grid-cols-2 gap-5 mt-5">
        {companies &&
          companies.map((company) => (
            <CompanyTeaser key={company.id} company={company} />
          ))}
      </div>
    </Layout>
  );
};

export default Feed;
