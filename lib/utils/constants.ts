export const EMPLOYEE_PATHS = {
  LIST: '/employee/list',
  EDIT: (id: string) => `/employee/edit/${id}`,
  ADD: '/employee/add',
};

export const VIEW_MODES = {
  LIST: 'list' as const,
  GRID: 'grid' as const,
};

export const BUTTON_TYPES = {
  BUTTON: 'button',
  SUBMIT: 'submit',
  RESET: 'reset',
} as const;

export const DEFAULT_SEARCH_TERM = '';
export const DEFAULT_SORT_BY = 'created_at';
export const DEFAULT_SORT_ORDER = 'desc';
