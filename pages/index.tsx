import React from 'react';
import { GetStaticProps } from 'next';
import prisma from '../lib/prisma';
import Layout from '../components/Layout';
import Company, { CompanyProps } from '../components/Company';

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.company.findMany();
  return { props: { feed } };
};

type CompanyProps = {
  feed: Company[];
};

const Blog: React.FC<CompanyProps> = (props) => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold underline pb-3">Web3 Companies</h1>
      <div className="page">
        <main>
          {props.feed.map((company) => (
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

export default Blog;
