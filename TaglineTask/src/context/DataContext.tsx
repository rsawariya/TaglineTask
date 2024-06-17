import React, { createContext, useReducer, useEffect, ReactNode, Dispatch, useContext, act } from 'react';
import { data } from '../../data/data';
import halperDataToFilter from '../utils/helperDataToFilter';

interface State {
  data: [];
  filteredData: [];
  filters: {};
  appliedFilters: {};
  isFiltered: boolean
}

type Action =
  | { type: 'SET_DATA'; payload: [] }
  | { type: 'SET_FILTER'; payload: [] }
  | { type: 'APPLY_FILTERS'; payload: {} };

const initialState: State = {
  data: [],
  filteredData: [],
  filters: {},
  appliedFilters: {},
  isFiltered: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload, filteredData: action.payload };
    case 'SET_FILTER':
      return { ...state, filters: action.payload };
    case 'APPLY_FILTERS':
      let newFilters = action.payload;
      let filterResult = state.data;
      if (filterResult.length < 1) filterResult = state.data;
      Object.keys(newFilters).forEach((key) => {
        if (key === "name") {
          console.log("in context", action.payload);
          const pattern = new RegExp(newFilters[key], 'i');
          filterResult = filterResult.filter(item => pattern.test(item["name"]));
        } else {
          filterResult = filterResult.filter(item => newFilters[key] && newFilters[key].includes(item[key]));
        }
      })
      console.log("filterResult", filterResult)
      let anyFilter = (Object.values(newFilters).some(value => Array.isArray(value) && value.length > 0)) || !!newFilters["name"].length;

      return { ...state, appliedFilters: action.payload, filteredData: filterResult, isFiltered: anyFilter };
    default:
      return state;
  }
};

interface DataContextProps {
  state: State;
  dispatch: Dispatch<Action>;
}

export const DataContext = createContext<DataContextProps | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const parsedData = data;
    dispatch({ type: 'SET_DATA', payload: parsedData });
    dispatch({ type: 'SET_FILTER', payload: halperDataToFilter(data) });
  }, []);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};


export const useData = () => {
  return useContext(DataContext);
}