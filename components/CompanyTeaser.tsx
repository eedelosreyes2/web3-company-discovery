import React from 'react';
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
  links: Object[];
  tags: Object[];
  published: boolean;
};

const CompanyTeaser: React.FC<{ company: CompanyTeaserProps }> = ({
  company,
}) => {
  const { id, name, about, logoUrl, tags } = company;

  return (
    <div
      className="relative cursor-pointer bg-slate-800 border border-slate-600 rounded-lg h-48 max-w-sm px-5 pt-4 my-4"
      onClick={() => Router.push('/companies/[id]', `/companies/${id}`)}
    >
      <div className="flex items-center">
        {logoUrl && (
          <div className="pr-2">
            <Image
              loader={() => logoUrl + '?w=' + 48}
              src={logoUrl}
              width={48}
              height={48}
            />
          </div>
        )}
        <h2>{name}</h2>
      </div>
      <div className="line-clamp-2 text-slate-400 my-2">{about}</div>
      <div className="flex absolute bottom-4 pt-3">
        {tags &&
          tags.map((tag) => (
            <div
              key={tag['id']}
              className="text-slate-400 bg-slate-700 border border-slate-600 rounded-xl px-3 mr-2"
            >
              {tag['name']}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CompanyTeaser;
