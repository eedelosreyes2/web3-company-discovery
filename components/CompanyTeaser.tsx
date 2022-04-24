import React from 'react';
import ReactMarkdown from 'react-markdown';
import Router from 'next/router';
import Image from 'next/image';

export type CompanyTeaserProps = {
  id: string;
  name: string;
  about: string;
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
  const { id, name, about, logoUrl, tags } = company;

  return (
    <div
      className="cursor-pointer bg-slate-800 border border-slate-600 rounded-lg max-w-sm px-5 py-4 my-4"
      onClick={() => Router.push('/companies/[id]', `/companies/${id}`)}
    >
      <div className="flex items-center">
        {logoUrl ? (
          <div className="pr-2">
            <Image
              loader={() => logoUrl}
              src={logoUrl}
              width={48}
              height={48}
            />
          </div>
        ) : (
          ''
        )}
        <h2>{name}</h2>
      </div>
      <div className="text-slate-400">{about}</div>
    </div>
  );
};

export default CompanyTeaser;
