import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';

export type CompanyProps = {
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

const Company: React.FC<{ company: CompanyProps }> = ({ company }) => {
  return (
    <div
      onClick={() => Router.push('/companies/[id]', `/companies/${company.id}`)}
    >
      <h2>{company.name}</h2>
      <ReactMarkdown children={company.description} />
    </div>
  );
};

export default Company;
