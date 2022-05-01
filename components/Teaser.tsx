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
        className="transform transition duration-200 hover:scale-105 relative cursor-pointer bg-slate-800 border border-slate-700 rounded-lg h-48 w-96 max-w-sm px-5 pt-4 mb-5 md:mb-0"
        // onClick={() => Router.push('/companies/[id]', `/companies/${id}`)}
        onClick={() => (modalOpen ? close() : open())}
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
        <div className="line-clamp-2 text-slate-400 my-2">{description}</div>
        <div className="flex absolute bottom-4 pt-3">
          {tags &&
            tags.map((tag) => (
              <div key={tag['id']} className="pill">
                {tag['name']}
              </div>
            ))}
        </div>
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
