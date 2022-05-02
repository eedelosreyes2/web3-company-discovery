import { Disclosure, Menu } from '@headlessui/react'
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid'

type FilterOption = {
    value: string,
    label: string,
    checked: boolean,
}

type FilterCategory = {
    id: string,
    name: string,
    options: FilterOption[],
}

type Props = {
    handleFilter: React.MouseEventHandler<HTMLInputElement>,
    categories: FilterCategory[],
};

const Filter: React.FC<Props> = ({ handleFilter, categories }) => {
    return (<main>
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
                <form className="lg:block">

                    {categories.map((section) => (
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
                                                        onClick={handleFilter}
                                                        className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
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
    </main>);
}

export default Filter;
