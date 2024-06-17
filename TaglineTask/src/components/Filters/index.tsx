import React, { memo, useCallback, useState } from 'react';
import Toggle from '../Toggle';
import { useData } from '../../context/DataContext';
import Field from '../Field';

interface FiltersProps {
    filters: { [key: string]: string | string[] };
}

const Filters: React.FC<FiltersProps> = ({ filters }) => {
    const { state, dispatch } = useData();
    const [name, setName] = useState<string>('');

    const { appliedFilters } = state;

    const handleChange = useCallback((value: string) => {
        setName(value);
        dispatch({ type: 'APPLY_FILTERS', payload: { ...appliedFilters, name: value } });
    }, [appliedFilters, dispatch]);

    const handleToggle = useCallback((key: string, value: string) => {
        let newFilters = { ...appliedFilters };
        let filter = newFilters[key];

        if (key === "name") {
            newFilters = { ...newFilters, name: value };
        } else {
            if (filter) {
                let index = filter.indexOf(value);
                if (index !== -1) {
                    filter.splice(index, 1);
                } else {
                    filter.push(value);
                }
            } else {
                filter = [value];
            }
            newFilters = { ...newFilters, [key]: filter };
        }

        dispatch({ type: 'APPLY_FILTERS', payload: newFilters });
    }, [appliedFilters, dispatch]);

    return (
        <div className='flex justify-around'>
            {Object.keys(filters).length > 0 &&
                Object.keys(filters).map((key) =>
                    key !== 'id' && (
                        <div key={key}>
                            <h1 className='uppercase'>{key}</h1>
                            <div className='flex flex-col gap-2'>
                                {Array.isArray(filters[key]) &&
                                    (filters[key] as string[]).length > 0 &&
                                    (filters[key] as string[]).map((data) => (
                                        <Toggle
                                            key={data}
                                            data={data}
                                            handleToggle={() => handleToggle(key, data)}
                                        />
                                    ))}
                            </div>
                        </div>
                    )
                )}
            <Field value={name} handleChange={handleChange} />
        </div>
    );
};

export default memo(Filters);
