import React from 'react';
import { GetStaticProps } from 'next';
import prisma from '../lib/prisma';
import Layout from '../components/Layout';
import Company, { CompanyProps } from '../components/CompanyTeaser';

export const getStaticProps: GetStaticProps = async () => {
  const companies = await prisma.company.findMany();
  return { props: { companies } };
};

type Company = {
  companies: CompanyProps[];
};

const Home: React.FC<CompanyProps> = ({ companies }) => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold underline pb-3">Web3 Companies</h1>
      <div className="page">
        <main>
          {companies.map((company) => (
            <div key={company.id} className="post">
              <Company company={company} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Home;
