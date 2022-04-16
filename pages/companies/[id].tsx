import React from 'react';
import prisma from '../../lib/prisma';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
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
        <p>{description}</p>
        <p>{email}</p>
        <p>{url}</p>
        {logoUrl ? (
          <Image src={logoUrl} width={150} height={150} />
        ) : (
          'No logo URL provided'
        )}
        <p>{links}</p>
        <p>{tags}</p>
      </div>
    </Layout>
  );
};

export default CompanyPage;
