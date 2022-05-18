import React, { useState } from 'react';
import Router from 'next/router';
import Image from 'next/image';
import Modal from '../components/modal';
import { AnimatePresence, motion } from 'framer-motion';

type CompanyProps = {
  id: string;
  name: string;
  description: string;
  about: string;
  email: string;
  url: string;
  logoUrl: string;
  links: Object[];
  blockchains: Object[];
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

const Teaser: React.FC<{ company: CompanyProps }> = ({ company }) => {
  const { id, name, description, about, logoUrl, blockchains, tags } = company;

  const [modalOpen, setModalOpen] = useState(false);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  const imgSrc = `/company_logos/${id}.png`;

  return (
    <>
      <div
        className="shrink bg-slate-800 border border-slate-700 rounded-lg 
            relative flex flex-col justify-between cursor-pointer 
            transform transition duration-200 md:hover:scale-105 
            h-[200px] md:max-w-sm p-6"
        // onClick={() => Router.push('/companies/[id]', `/companies/${id}`)}
        onClick={() => (modalOpen ? close() : open())}
      >
        <div className="flex items-center space-x-3">
          <div className="relative flex-none w-12 h-12 rounded-sm">
            <Image
              className="card_image"
              src={imgSrc}
              alt={name}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h4>{name}</h4>
        </div>
        <p className="line-clamp-2">{description}</p>
        <ul className="line-clamp-1 space-x-2">
          {tags &&
            tags
              .sort((a, b) => a['name'].localeCompare(b['name']))
              .map((tag) => (
                <div key={tag['id']} className="badge">
                  {tag['name']}
                </div>
              ))}
          {blockchains &&
            blockchains
              .sort((a, b) => a['name'].localeCompare(b['name']))
              .map((blockchain) => (
                <li key={blockchain['id']} className="badge">
                  {blockchain['acronym']}
                </li>
              ))}
        </ul>
      </div>

      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {modalOpen && <Modal handleClose={close} company={company} />}
      </AnimatePresence>
    </>
  );
};

export default Teaser;
