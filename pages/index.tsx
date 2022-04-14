import React from 'react';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import Post, { PostProps } from '../components/Post';

export const getStaticProps: GetStaticProps = async () => {
  const company = [
    {
      id: '0',
      title: 'Magic Eden',
      about: 'The leading Solana NFT Marketplace',
      logoUrl:
        'https://yt3.ggpht.com/p4xsMYgTH2iQ6nC43SS1N3XpV9XrqNSQJ_wC5TWgVafR3-3RhUOtKhuW1quPCbcQXIygAXxe=s900-c-k-c0x00ffffff-no-rj',
      tags: ['NFTs'],
      url: 'https://www.magiceden.io/',
      socials: {
        twitter: 'https://twitter.com/MagicEden',
        discord: 'https://discord.com/invite/b87UnCy6P2',
      },
    },
    {
      id: '1',
      title: 'OpenSea',
      about: 'The leading Ethereum NFT Marketplace',
      logoUrl:
        'https://d1lss44hh2trtw.cloudfront.net/assets/article/2022/02/19/opensea-nft-marketplace-exploit-nfts-stolen-phishing_feature.jpg',
      tags: ['NFTs'],
      url: 'https://www.opensea.io/',
      socials: {
        twitter: 'https://twitter.com/opensea',
        discord: 'https://discord.gg/opensea',
      },
    },
  ];
  return { props: { company } };
};

type Props = {
  company: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold underline pb-3">Web3 Companies</h1>
      <div className="page">
        <main>
          {props.company.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;
