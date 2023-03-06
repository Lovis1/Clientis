import { format } from "date-fns";
import ColumnFilter from "./ColumnFilter";

export const COLUMNS_BS_BANK_STRATEGIES = [
  {
    Header: "strategyId",
    accessor: "strategyId",
    Footer: "strategyId",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "name@de",
    accessor: "name@de",
    Footer: "name@de",
    // Filter: ColumnFilter
  },
  {
    Header: "name@fr",
    accessor: "name@fr",
    Footer: "name@fr",
    // Filter: ColumnFilter
  },
  {
    Header: "externalName@de",
    accessor: "externalName@de",
    Footer: "externalName@de",
    // Filter: ColumnFilter
  },
  {
    Header: "externalName@fr",
    accessor: "externalName@fr",
    Footer: "externalName@fr",
    // Filter: ColumnFilter
  },
  {
    Header: "description@de",
    accessor: "description@de",
    Footer: "description@de",
    // Filter: ColumnFilter
  },
  {
    Header: "description@fr",
    accessor: "description@fr",
    Footer: "description@fr",
    // Filter: ColumnFilter
  },
];

export const COLUMNS_BS_TACTICS = [
  {
    Header: "tacticsId",
    accessor: "tacticsId",
    Footer: "tacticsId",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "strategyId",
    accessor: "strategyId",
    Footer: "strategyId",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "name@de",
    accessor: "name@de",
    Footer: "name@de",
    // Filter: ColumnFilter
  },
  {
    Header: "name@fr",
    accessor: "name@fr",
    Footer: "name@fr",
    // Filter: ColumnFilter
  },
  {
    Header: "externalName@de",
    accessor: "externalName@de",
    Footer: "externalName@de",
    // Filter: ColumnFilter
  },
  {
    Header: "externalName@fr",
    accessor: "externalName@fr",
    Footer: "externalName@fr",
    // Filter: ColumnFilter
  },
  {
    Header: "description@de",
    accessor: "description@de",
    Footer: "description@de",
    // Filter: ColumnFilter
  },
  {
    Header: "description@fr",
    accessor: "description@fr",
    Footer: "description@fr",
    // Filter: ColumnFilter
  },
];

export const COLUMNS_BS_USE_STRATEGY = [
  {
    Header: "personCriteria",
    accessor: "personCriteria",
    Footer: "personCriteria",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "customerCriteria",
    accessor: "customerCriteria",
    Footer: "customerCriteria",
    // Filter: ColumnFilter
  },
  {
    Header: "useStrategy",
    accessor: "useStrategy",
    Footer: "useStrategy",
    // Filter: ColumnFilter
  },
];

export const COLUMNS_BS_USE_TACTICS = [
  {
    Header: "personCriteria",
    accessor: "personCriteria",
    Footer: "personCriteria",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "customerCriteria",
    accessor: "customerCriteria",
    Footer: "customerCriteria",
    // Filter: ColumnFilter
  },
  {
    Header: "useTactics",
    accessor: "useTactics",
    Footer: "useTactics",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
];

export const COLUMNS_BS_DIRECT_ASSIGNMENT_COMPLETE = [
  {
    Header: "personCriteria",
    accessor: "personCriteria",
    Footer: "personCriteria",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "customerCriteria",
    accessor: "customerCriteria",
    Footer: "customerCriteria",
    // Filter: ColumnFilter
  },
  {
    Header: "strategyId",
    accessor: "strategyId",
    Footer: "strategyId",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
];

export const COLUMNS_BS_PROFILE_ASSIGNEMENTS_COMPLETE = [
  {
    Header: "personCriteria",
    accessor: "personCriteria",
    Footer: "personCriteria",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "customerCriteria",
    accessor: "customerCriteria",
    Footer: "customerCriteria",
    // Filter: ColumnFilter
  },
  {
    Header: "strategyId",
    accessor: "strategyId",
    Footer: "strategyId",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
];

export const COLUMNS_BS_ASSIGNMENT_BY_REFERENCE_COMPLETE = [
  {
    Header: "personCriteria",
    accessor: "personCriteria",
    Footer: "personCriteria",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "customerCriteria",
    accessor: "customerCriteria",
    Footer: "customerCriteria",
    // Filter: ColumnFilter
  },
];

export const COLUMNS_BS_TARGET_DURATIONS = [
  {
    Header: "strategyId",
    accessor: "strategyId",
    Footer: "strategyId",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "refCurrency",
    accessor: "refCurrency",
    Footer: "refCurrency",
    // Filter: ColumnFilter
  },
  {
    Header: "schemeId",
    accessor: "schemeId",
    Footer: "schemeId",
    // Filter: ColumnFilter
  },
  {
    Header: "assetClassId",
    accessor: "assetClassId",
    Footer: "assetClassId",
    // Filter: ColumnFilter
  },
  {
    Header: "duration",
    accessor: "duration",
    Footer: "duration",
    // Filter: ColumnFilter
  },
];

export const COLUMNS_BS_TACTICS_TARGET_DURATIONS = [
  {
    Header: "tacticsId",
    accessor: "tacticsId",
    Footer: "tacticsId",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "refCurrency",
    accessor: "refCurrency",
    Footer: "refCurrency",
    // Filter: ColumnFilter
  },
  {
    Header: "schemeId",
    accessor: "schemeId",
    Footer: "schemeId",
    // Filter: ColumnFilter
  },
  {
    Header: "assetClassId",
    accessor: "assetClassId",
    Footer: "assetClassId",
    // Filter: ColumnFilter
  },
  {
    Header: "duration",
    accessor: "duration",
    Footer: "duration",
    // Filter: ColumnFilter
  },
];

export const COLUMNS_BS_ALLOCATIONS_2 = [
  {
    Header: "strategyId",
    accessor: "strategyId",
    Footer: "strategyId",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "refCurrency",
    accessor: "refCurrency",
    Footer: "refCurrency",
    // Filter: ColumnFilter
  },
  {
    Header: "assetSchemeId",
    accessor: "assetSchemeId",
    Footer: "assetSchemeId",
    // Filter: ColumnFilter
  },
  {
    Header: "assetClassId",
    accessor: "assetClassId",
    Footer: "assetClassId",
    // Filter: ColumnFilter
  },
  {
    Header: "weight",
    accessor: "weight",
    Footer: "weight",
    // Filter: ColumnFil
  },
];

export const COLUMNS_BS_TACTICS_ALLOCATIONS = [
  {
    Header: "tacticsId",
    accessor: "tacticsId",
    Footer: "tacticsId",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "refCurrency",
    accessor: "refCurrency",
    Footer: "refCurrency",
    // Filter: ColumnFilter
  },
  {
    Header: "assetSchemeId",
    accessor: "assetSchemeId",
    Footer: "assetSchemeId",
    // Filter: ColumnFilter
  },
  {
    Header: "assetClassId",
    accessor: "assetClassId",
    Footer: "assetClassId",
    // Filter: ColumnFilter
  },
  {
    Header: "weight",
    accessor: "weight",
    Footer: "weight",
    // Filter: ColumnFil
  },
];

export const COLUMNS_RY_RISKYRANGE_ASSIGNMENT_COMPLET = [
  {
    Header: "personCriteria",
    accessor: "personCriteria",
    Footer: "personCriteria",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "customerCriteria",
    accessor: "customerCriteria",
    Footer: "customerCriteria",
    // Filter: ColumnFilter
  },
  {
    Header: "riskyMin",
    accessor: "riskyMin",
    Footer: "riskyMin",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "riskyMax",
    accessor: "riskyMax",
    Footer: "riskyMax",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
];
//USER OPERATES CHANGES IN THIS TABLE
export const COLUMNS_MP_MODELPORTFOLIO_MODULES = [
  {
    Header: "moduleId",
    accessor: "moduleId",
    Footer: "moduleId",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "assetSchemeId",
    accessor: "assetSchemeId",
    Footer: "assetSchemeId",
    // Filter: ColumnFilter
  },
  {
    Header: "assetClassId",
    accessor: "assetClassId",
    Footer: "assetClassId",
    // Filter: ColumnFilter
  },
];

//USER OPERATES CHANGES IN THIS TABLE
export const COLUMNS_MP_MODELPORTFOLIO_MODULE_CONTENTS = [
  {
    Header: "moduleId",
    accessor: "moduleId",
    Footer: "moduleId",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "instrumentId",
    accessor: "instrumentId",
    Footer: "instrumentId",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "weight",
    accessor: "weight",
    Footer: "weight",
    // Filter: ColumnFilter
  },
];

//USER OPERATES CHANGES IN THIS TABLE
export const COLUMNS_MP_MODELPORTFOLIOS = [
  {
    Header: "modelPfId",
    accessor: "modelPfId",
    Footer: "modelPfId",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "name@fr",
    accessor: "name@fr",
    Footer: "name@fr",
    // Filter: ColumnFilter
  },
  {
    Header: "externalName@de",
    accessor: "externalName@de",
    Footer: "externalName@de",
    // Filter: ColumnFilter
  },
  {
    Header: "externalName@fr",
    accessor: "externalName@fr",
    Footer: "externalName@fr",
    // Filter: ColumnFilter
  },
  {
    Header: "description@de",
    accessor: "description@de",
    Footer: "description@de",
    // Filter: ColumnFilter
  },
  {
    Header: "description@fr",
    accessor: "description@fr",
    Footer: "description@fr",
    // Filter: ColumnFilter
  },
];
export const COLUMNS_MP_MODELPORTFOLIO_POOLING = [
  {
    Header: "modelPfId",
    accessor: "modelPfId",
    Footer: "modelPfId",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "assetSchemeId",
    accessor: "assetSchemeId",
    Footer: "assetSchemeId",
    // Filter: ColumnFilter
  },
  {
    Header: "refCurrency",
    accessor: "refCurrency",
    Footer: "refCurrency",
    // Filter: ColumnFilter
  },
];

//USER OPERATES CHANGES IN THIS TABLE
export const COLUMNS_MP_MODELPORTFOLIO_MODULE_ASSIGNMENTS = [
  {
    Header: "modelPfId",
    accessor: "modelPfId",
    Footer: "modelPfId",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "assetSchemeId",
    accessor: "assetSchemeId",
    Footer: "assetSchemeId",
    // Filter: ColumnFilter
  },
  {
    Header: "refCurrency",
    accessor: "refCurrency",
    Footer: "refCurrency",
    // Filter: ColumnFilter
  },
  {
    Header: "assetClassId",
    accessor: "assetClassId",
    Footer: "assetClassId",
    // Filter: ColumnFilter
  },
  {
    Header: "moduleId",
    accessor: "moduleId",
    Footer: "moduleId",
    // Filter: ColumnFilter
  },
];

//USER OPERATES CHANGES IN THIS TABLE
export const COLUMNS_MP_MODELPORTFOLIO_STRATEGY_ASSIGNMENTS_COMPLETE = [
  {
    Header: "personCriteria",
    accessor: "personCriteria",
    Footer: "personCriteria",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "customerCriteria",
    accessor: "customerCriteria",
    Footer: "customerCriteria",
    // Filter: ColumnFilter
  },
  {
    Header: "strategyId",
    accessor: "strategyId",
    Footer: "strategyId",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "modelPfId",
    accessor: "modelPfId",
    Footer: "modelPfId",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "isDefault",
    accessor: "isDefault",
    Footer: "isDefault",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
];

export const COLUMNS_MP_MODELPORTFOLIO_TACTICS_ASSIGNMENTS_COMPLETE = [
  {
    Header: "personCriteria",
    accessor: "personCriteria",
    Footer: "personCriteria",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "customerCriteria",
    accessor: "customerCriteria",
    Footer: "customerCriteria",
    // Filter: ColumnFilter
  },
  {
    Header: "tacticsId",
    accessor: "tacticsId",
    Footer: "tacticsId",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "modelPfId",
    accessor: "modelPfId",
    Footer: "modelPfId",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "isDefault",
    accessor: "isDefault",
    Footer: "isDefault",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
];
