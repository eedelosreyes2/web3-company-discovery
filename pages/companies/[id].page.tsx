import React from 'react';
import prisma from '../../lib/prisma';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { TeaserProps } from '../../components/Teaser';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const company = await prisma.company.findMany({
    where: { id: params.id.toString() },
    include: { links: true, tags: true },
  });

  return { props: { company } };
};

type Props = {
  company: TeaserProps;
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
          <Image
            loader={() => logoUrl}
            src={logoUrl}
            width={150}
            height={150}
          />
        ) : (
          'No logo URL provided'
        )}
      </div>
    </Layout>
  );
};

export default CompanyPage;
