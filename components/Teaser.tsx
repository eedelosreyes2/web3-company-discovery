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

  return (
    <>
      <div
        className="bg-slate-800 border border-slate-700 rounded-lg 
            relative flex flex-col justify-between cursor-pointer 
            transform transition duration-200 hover:scale-105 
            h-[200px] max-w-sm p-6 mb-5 md:ml-5"
        // onClick={() => Router.push('/companies/[id]', `/companies/${id}`)}
        onClick={() => (modalOpen ? close() : open())}
      >
        <div className="flex items-center space-x-3">
          {logoUrl && (
            <div className="relative flex-none w-12 h-12 rounded-sm">
              <Image
                className="card_image"
                src={`/company_logos/${id}.png`}
                alt={name}
                layout="fill"
                objectFit="contain"
              />
            </div>
          )}
          <h4>{name}</h4>
        </div>
        <p className="line-clamp-2">{description}</p>
        <ul className="flex space-x-2">
          {blockchains &&
            blockchains.map((blockchain) => (
              <li key={blockchain['id']} className="badge">
                {blockchain['acronym']}
              </li>
            ))}
          {tags &&
            tags.map((tag) => (
              <div key={tag['id']} className="badge">
                {tag['name']}
              </div>
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
