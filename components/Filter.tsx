import { Disclosure } from '@headlessui/react';
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid';

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
  handleFilter: React.MouseEventHandler<HTMLInputElement>;
  categories: FilterCategory[];
};

const Filter: React.FC<Props> = ({ handleFilter, categories }) => {
  return (
    <div className="md:w-64">
      {/* <p className="text-slate-50 pb-6">Filters</p> */}
      <form>
        {categories.map((section) => (
          <Disclosure as="div" key={section.id} className="pb-6">
            {({ open }) => (
              <>
                <Disclosure.Button className="py-3 w-full flex justify-between text-sm text-slate-400">
                  <div className="font-medium text-slate-400">
                    {section.name}
                  </div>
                  {open ? (
                    <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </Disclosure.Button>
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
                          className="h-4 w-4 rounded"
                        />
                        <label
                          htmlFor={`filter-${section.id}-${optionIdx}`}
                          className="pl-3 text-sm text-slate-400"
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
  );
};

export default Filter;
