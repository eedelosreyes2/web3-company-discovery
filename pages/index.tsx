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
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold font-black pb-3">
          Discover and learn about web3 companies
        </h1>
        <div>*Search bar component*</div>
      </div>
      <div className="page">
        <main>
          {companies &&
            companies.map((company) => (
              <CompanyTeaser key={company.id} company={company} />
            ))}
        </main>
      </div>
    </Layout>
  );
};

export default Feed;
