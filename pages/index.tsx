import React from 'react';
import { GetStaticProps } from 'next';
import prisma from '../lib/prisma';
import Layout from '../components/Layout';
import CompanyTeaser, { CompanyTeaserProps } from '../components/CompanyTeaser';

export const getStaticProps: GetStaticProps = async () => {
  const companies = await prisma.company.findMany();
  return { props: { companies } };
};

type Props = {
  companies: CompanyTeaserProps[];
};

const Feed: React.FC<Props> = ({ companies }) => {
  return (
    <Layout>
      <h1 className="text-xl font-bold pb-3">Web3 Companies</h1>
      <div className="page">
        <main>
          {companies.map((company) => (
            <div
              key={company.id}
              className="border border-slate-900 rounded-lg px-5 py-2"
            >
              <CompanyTeaser company={company} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Feed;
