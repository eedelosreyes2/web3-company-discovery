import React from 'react';
import { GetStaticProps } from 'next';
import prisma from '../lib/prisma';
import Layout from '../components/Layout';
import CompanyTeaser, { CompanyTeaserProps } from '../components/CompanyTeaser';

export const getStaticProps: GetStaticProps = async () => {
  const companies = await prisma.company.findMany({
    where: { published: true },
  });
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
          {Object.keys(companies).length
            ? companies.map((company) =>
                company.id ? (
                  <CompanyTeaser key={company.id} company={company} />
                ) : (
                  ''
                )
              )
            : ''}
        </main>
      </div>
    </Layout>
  );
};

export default Feed;
