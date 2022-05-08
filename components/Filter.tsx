import { Disclosure } from "@headlessui/react";

type FilterOption = {
    value: string;
    label: string;
    checked: boolean;
};

type FilterCategory = {
    id: string;
    name: string;
    options: FilterOption[];
};

type Props = {
    display: boolean;
    handleFilter: React.MouseEventHandler<HTMLInputElement>;
    categories: FilterCategory[];
};

const Filter: React.FC<Props> = ({ display, handleFilter, categories }) => {
    return (
        <div
            className={
                "max-w-sm mx-auto w-full md:mx-0 md:w-52 pb-6 md:mr-6" +
                (display ? "" : " hidden md:block")
            }
        >
            <h4 className="text-slate-50 pb-6 border-b border-slate-800">
                Filters
            </h4>
            <form>
                {categories.map((section) => (
                    <Disclosure
                        as="div"
                        key={section.id}
                        className="border-b border-slate-800"
                    >
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="py-6 w-full flex justify-between text-sm text-slate-400">
                                    <p className="text-slate-400">
                                        {section.name}
                                    </p>
                                    {open ? (
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M18.25 12H5.75"
                                                stroke="#94A3B8"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M12 5.75V18.25"
                                                stroke="#94A3B8"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M18.25 12H5.75"
                                                stroke="#94A3B8"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    )}
                                </Disclosure.Button>
                                <Disclosure.Panel className="pb-6">
                                    <div className="space-y-4">
                                        {section.options.map(
                                            (option, optionIdx) => (
                                                <div
                                                    key={option.value}
                                                    className="flex items-center"
                                                >
                                                    <input
                                                        id={`filter-${section.id}-${optionIdx}`}
                                                        name={`${section.id}[]`}
                                                        defaultValue={
                                                            option.value
                                                        }
                                                        type="checkbox"
                                                        defaultChecked={
                                                            option.checked
                                                        }
                                                        onClick={handleFilter}
                                                        className="cursor-pointer h-4 w-4 rounded"
                                                    />
                                                    <label
                                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                                        className="cursor-pointer pl-3 text-base font-normal text-slate-400"
                                                    >
                                                        {option.label}
                                                    </label>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                ))}
            </form>
        </div>
    );
};

export default Filter;
