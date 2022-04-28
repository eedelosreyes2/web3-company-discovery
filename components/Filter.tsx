import { Disclosure, Menu } from '@headlessui/react'
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid'

const filters = [
    {
        id: 'blockchain',
        name: 'Blockchain',
        options: [
            { value: 'eth', label: 'ETH', checked: false },
            { value: 'sol', label: 'Beige', checked: false },
            { value: 'avax', label: 'Blue', checked: false },
            { value: 'terra', label: 'Brown', checked: false },
            { value: 'btc', label: 'Green', checked: false },
            { value: 'matic', label: 'Purple', checked: false },
            { value: 'near', label: 'Purple', checked: false },
        ],
    },
    {
        id: 'tags',
        name: 'Tags',
        options: [
            { value: 'nft', label: 'NFT', checked: false },
            { value: 'dex', label: 'DEX', checked: false },
            { value: 'analytics', label: 'Analytics', checked: false },
            { value: 'marketplace', label: 'Marketplace', checked: false },
            { value: 'education', label: 'Education', checked: false },
            { value: 'news', label: 'News', checked: false },
            { value: 'dao', label: 'DAO', checked: false },
            { value: 'protocol', label: 'Protocol', checked: false },
            { value: 'defi', label: 'DeFi', checked: false },
            { value: 'swap', label: 'Swap', checked: false },
            { value: 'wallet', label: 'Wallet', checked: false },
            { value: 'blockchain', label: 'Blockchain', checked: false },
            { value: 'community', label: 'Community', checked: false },
            { value: 'layer_2', label: 'Layer 2', checked: false },
        ],
    },
]

export default () => (
    <main>
        <div className="relative z-10 flex items-baseline justify-between">

            <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <p className="group inline-flex justify-center text-md font-medium text-slate-50">
                            Filter
                        </p>
                    </div>
                </Menu>
            </div>
        </div>

        <section aria-labelledby="products-heading" className="pt-6 pb-24">

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                {/* Filters */}
                <form className="lg:block">

                    {filters.map((section) => (
                        <Disclosure as="div" key={section.id} className="py-6">
                            {({ open }) => (
                                <>
                                    <h3 className="-my-3 flow-root">
                                        <Disclosure.Button className="py-3 w-full flex items-center justify-between text-sm text-slate-400">
                                            <span className="font-medium text-slate-400">{section.name}</span>
                                            <span className="ml-6 flex items-center">
                                                {open ? (
                                                    <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                ) : (
                                                    <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                )}
                                            </span>
                                        </Disclosure.Button>
                                    </h3>
                                    <Disclosure.Panel className="pt-6">
                                        <div className="space-y-4">
                                            {section.options.map((option, optionIdx) => (
                                                <div key={option.value} className="flex items-center">
                                                    <input
                                                        id={`filter-${section.id}-${optionIdx}`}
                                                        name={`${section.id}[]`}
                                                        defaultValue={option.value}
                                                        type="checkbox"
                                                        defaultChecked={option.checked}
                                                        className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                    <label
                                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                                        className="ml-3 text-sm text-slate-400"
                                                    >
                                                        {option.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    ))}
                </form>
            </div>
        </section>
    </main>
)
