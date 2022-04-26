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

const contentfulLoader = ({ src, quality, width }) => {
  const params = [`w=${width}`];

  if (quality) {
    params.push(`q=${quality}`);
  }

  return `${src}?${params.join('&')}`;
};

const CompanyTeaser: React.FC<{ company: CompanyTeaserProps }> = ({
  company,
}) => {
  const { id, name, about, logoUrl, tags } = company;

  return (
    <div
      className="transform transition duration-200 hover:scale-105 relative cursor-pointer bg-slate-800 border border-slate-700 rounded-lg h-48 max-w-sm px-5 pt-4 mb-5 md:mb-0"
      onClick={() => Router.push('/companies/[id]', `/companies/${id}`)}
    >
      <div className="flex items-center">
        {logoUrl && (
          <div className="pr-4">
            <Image
              loader={contentfulLoader}
              src={logoUrl}
              width={48}
              height={48}
            />
          </div>
        )}
        <h4>{name}</h4>
      </div>
      <div className="line-clamp-2 text-slate-400 my-2">{about}</div>
      <div className="flex absolute bottom-4 pt-3">
        {tags &&
          tags.map((tag) => (
            <div
              key={tag['id']}
              className="text-sm text-slate-400 bg-slate-700 border border-slate-600 rounded-xl px-3 mr-2"
            >
              {tag['name']}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CompanyTeaser;
