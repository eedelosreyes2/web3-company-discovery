import React from 'react';
import prisma from '../../lib/prisma';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { CompanyTeaserProps } from '../../components/CompanyTeaser';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const company = await prisma.company.findMany({
    where: { id: params.id.toString() },
  });

  return { props: { company } };
};

type Props = {
  company: CompanyTeaserProps;
};

const CompanyPage: React.FC<Props> = ({ company }) => {
  const { id, name, description, email, url, logoUrl, links, tags, published } =
    company[0];

  return (
    <Layout>
      <div>
        <h2>{name}</h2>
      </div>
    </Layout>
  );
};

export default CompanyPage;
