import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const contentfulLoader = ({ src, quality, width }) => {
  const params = [`w=${width}`];

  if (quality) {
    params.push(`q=${quality}`);
  }

  return `${src}?${params.join('&')}`;
};

const Modal = ({ handleClose, company }) => {
  const {
    id,
    name,
    description,
    about,
    email,
    url,
    logoUrl,
    links,
    blockchains,
    tags,
    published,
  } = company;

  const twitterUrl =
    links.length && links.find((link) => link.type === 'Twitter')
      ? links.find((link) => link.type === 'Twitter').url
      : null;
  const discordUrl =
    links.length && links.find((link) => link.type === 'Discord')
      ? links.find((link) => link.type === 'Discord').url
      : null;

  const CloseButton = () => {
    return (
      <a
        onClick={handleClose}
        className="flex items-center sm:p-2 top-8 right-8 bg-none sm:bg-slate-700 rounded-full hover:cursor-pointer"
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.25 6.75L6.75 17.25"
            stroke="#F8FAFC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.75 6.75L17.25 17.25"
            stroke="#F8FAFC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    );
  };

  return (
    <motion.div
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}
    >
      <div className="flex flex-col items-center sm:space-y-6 sm:mb-9 sm:mt-20">
        <motion.div className="flex justify-end w-full max-w-screen-sm">
          <div className="hidden sm:block">
            <CloseButton />
          </div>
        </motion.div>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="flex justify-center w-full max-w-screen-sm p-8 rounded-xl bg-slate-800 border border-slate-700"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          {/* content */}
          <div className="w-full">
            <div className="header flex items-start flex-col sm:flex-row sm:space-x-6">
              <div className="flex w-full sm:w-fit justify-between">
                <div className="relative w-[120px] h-[120px] flex-none rounded mb-8 sm:m-0">
                  <Image
                    className="modal_logo"
                    src={`/company_logos/${id}.png`}
                    alt={name}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="sm:hidden">
                  <CloseButton />
                </div>
              </div>
              <div className="flex-auto">
                <h3 className="text-2xl mb-1">{name}</h3>
                <p className="mb-3">{description}</p>
                <ul className="flex space-x-2">
                  {blockchains &&
                    blockchains.map((blockchain) => (
                      <li key={blockchain['id']} className="badge">
                        {blockchain['acronym']}
                      </li>
                    ))}
                  {tags &&
                    tags.map((tag) => (
                      <li key={tag['id']} className="badge">
                        {tag['name']}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <hr className="my-6 border-t border-slate-700" />
            <ul className="flex space-x-8 overflow-scroll scrollbar-hide">
              <li>
                <a
                  href={url}
                  target="_blank"
                  className="flex items-center text-base text-slate-400 hover:text-slate-100"
                >
                  <div className="mr-1">
                    <svg
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.75 13.25L18 12C19.6569 10.3431 19.6569 7.65685 18 6C16.3431 4.34315 13.6569 4.34315 12 6L10.75 7.25"
                        stroke="#94A3B8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.24999 10.75L5.99999 12C4.34314 13.6569 4.34314 16.3431 5.99999 18C7.65684 19.6569 10.3431 19.6569 12 18L13.25 16.75"
                        stroke="#94A3B8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.25 9.75L9.75 14.25"
                        stroke="#94A3B8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  {url.replace(/^https?\:\/\/(www.)?/i, '')}
                </a>
              </li>

              {twitterUrl && (
                <li>
                  <a
                    href={twitterUrl}
                    target="_blank"
                    className="flex items-center text-base text-slate-400 hover:text-slate-100"
                  >
                    <div className="mr-1">
                      <svg
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.4 5.54958C21.6344 5.88958 20.812 6.11838 19.9488 6.22158C20.8304 5.69358 21.5064 4.85758 21.8248 3.86078C21.0008 4.34958 20.0872 4.70478 19.1144 4.89678C18.336 4.06718 17.2272 3.54878 16 3.54878C13.6432 3.54878 11.7328 5.45998 11.7328 7.81598C11.7328 8.15038 11.7712 8.47678 11.8432 8.78798C8.29678 8.61038 5.15278 6.91118 3.04718 4.32878C2.68078 4.95918 2.47038 5.69198 2.47038 6.47518C2.47038 7.95518 3.22318 9.26158 4.36798 10.0264C3.66878 10.004 3.01038 9.81198 2.43518 9.49278C2.43518 9.51118 2.43518 9.52798 2.43518 9.54638C2.43518 11.6144 3.90558 13.3392 5.85838 13.7304C5.50078 13.828 5.12318 13.88 4.73358 13.88C4.45918 13.88 4.19118 13.8528 3.93118 13.804C4.47438 15.4992 6.05038 16.7336 7.91758 16.768C6.45758 17.9128 4.61758 18.5952 2.61758 18.5952C2.27358 18.5952 1.93358 18.5752 1.59918 18.5352C3.48798 19.7456 5.73038 20.452 8.14078 20.452C15.9904 20.452 20.2816 13.9496 20.2816 8.31038C20.2816 8.12558 20.2776 7.94158 20.2696 7.75838C21.104 7.15598 21.828 6.40478 22.4 5.54958Z"
                          fill="#94A3B8"
                        />
                      </svg>
                    </div>
                    Twitter
                  </a>
                </li>
              )}
              {discordUrl && (
                <li>
                  <a
                    href="https://mirror.xyz/"
                    target="_blank"
                    className="flex items-center text-base text-slate-400 hover:text-slate-100"
                  >
                    <div className="mr-1">
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.98 5.16937C18.0694 3.63187 15.0469 3.37124 14.9175 3.36187C14.7169 3.34499 14.5256 3.45749 14.4431 3.64312C14.4356 3.65437 14.37 3.80624 14.2969 4.04249C15.5606 4.25624 17.1131 4.68562 18.5175 5.55749C18.7425 5.69624 18.8119 5.99249 18.6731 6.21749C18.5813 6.36562 18.4256 6.44624 18.2644 6.44624C18.1781 6.44624 18.09 6.42187 18.0113 6.37312C15.5963 4.87499 12.5813 4.79999 12 4.79999C11.4188 4.79999 8.4019 4.87499 5.98877 6.37312C5.76377 6.51374 5.46752 6.44437 5.32877 6.21937C5.18815 5.99249 5.25752 5.69812 5.48252 5.55749C6.8869 4.68749 8.4394 4.25624 9.70315 4.04437C9.63002 3.80624 9.5644 3.65624 9.55877 3.64312C9.4744 3.45749 9.28502 3.34124 9.08252 3.36187C8.95315 3.37124 5.93065 3.63187 3.99377 5.18999C2.98315 6.12562 0.960022 11.5931 0.960022 16.32C0.960022 16.4044 0.982522 16.485 1.02377 16.5581C2.41877 19.0106 6.2269 19.6519 7.09502 19.68C7.09877 19.68 7.1044 19.68 7.11002 19.68C7.26377 19.68 7.40815 19.6069 7.49815 19.4831L8.37565 18.2756C6.00752 17.6644 4.79815 16.6256 4.72877 16.5637C4.53002 16.3894 4.51127 16.0856 4.68752 15.8869C4.8619 15.6881 5.16565 15.6694 5.3644 15.8437C5.39252 15.87 7.62002 17.76 12 17.76C16.3875 17.76 18.615 15.8625 18.6375 15.8437C18.8363 15.6712 19.1381 15.6881 19.3144 15.8887C19.4888 16.0875 19.47 16.3894 19.2713 16.5637C19.2019 16.6256 17.9925 17.6644 15.6244 18.2756L16.5019 19.4831C16.5919 19.6069 16.7363 19.68 16.89 19.68C16.8956 19.68 16.9013 19.68 16.905 19.68C17.7731 19.6519 21.5813 19.0106 22.9763 16.5581C23.0175 16.485 23.04 16.4044 23.04 16.32C23.04 11.5931 21.0169 6.12562 19.98 5.16937ZM8.88002 14.4C7.9519 14.4 7.20002 13.5412 7.20002 12.48C7.20002 11.4187 7.9519 10.56 8.88002 10.56C9.80815 10.56 10.56 11.4187 10.56 12.48C10.56 13.5412 9.80815 14.4 8.88002 14.4ZM15.12 14.4C14.1919 14.4 13.44 13.5412 13.44 12.48C13.44 11.4187 14.1919 10.56 15.12 10.56C16.0481 10.56 16.8 11.4187 16.8 12.48C16.8 13.5412 16.0481 14.4 15.12 14.4Z"
                          fill="#94A3B8"
                        />
                      </svg>
                    </div>
                    Discord
                  </a>
                </li>
              )}
            </ul>
            <hr className="my-6 border-t border-slate-700" />
            <div className="flex flex-col space-y-3">
              <h4>About</h4>
              <p>{about}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Modal;
