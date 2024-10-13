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
