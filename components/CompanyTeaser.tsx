import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';

export type CompanyTeaserProps = {
  id: string;
  name: string;
  description: string;
  email: string;
  url: string;
  logoUrl: string;
  links: object;
  tags: object;
  published: boolean;
};

const CompanyTeaser: React.FC<{ company: CompanyTeaserProps }> = ({
  company,
}) => {
  return (
    <div
      onClick={() => Router.push('/companies/[id]', `/companies/${company.id}`)}
    >
      <h2>{company.name}</h2>
      <ReactMarkdown children={company.description} />
    </div>
  );
};

export default CompanyTeaser;
