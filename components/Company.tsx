import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';

export type Company = {
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

const Company: React.FC<{ company: Company }> = ({ company }) => {
  return (
    <div onClick={() => Router.push('/p/[id]', `/p/${company.id}`)}>
      <h2>{company.name}</h2>
      {/* <small>By {authorName}</small> */}
      <ReactMarkdown children={company.description} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Company;
