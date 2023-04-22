import { cx } from 'class-variance-authority';

type Props = {
  children: React.ReactNode;
  type: 'info' | 'note' | 'success' | 'warning' | 'error';
  hideType?: boolean;
};

export const CalloutPanel = ({ children, type, hideType = false }: Props) => {
  return (
    <div
      className={cx(
        'relative my-6 rounded-md px-8 pb-4 font-medium',
        hideType ? 'pt-4' : 'pt-5',
        type === 'info' ? 'bg-blue-200/50 text-blue-800 dark:bg-blue-400/10 dark:text-blue-200' : '',
        type === 'note' ? 'bg-purple-200/50 text-purple-800 dark:bg-purple-400/10 dark:text-purple-200' : '',
        type === 'success' ? 'bg-green-200/50 text-green-800 dark:bg-green-400/10 dark:text-green-200' : '',
        type === 'warning' ? 'bg-yellow-200/50 text-yellow-800 dark:bg-yellow-400/10 dark:text-yellow-200' : '',
        type === 'error' ? 'bg-red-200/50 text-red-800 dark:bg-red-400/10 dark:text-red-200' : ''
      )}
    >
      {!hideType && (
        <div
          className={cx(
            'jusitfy-center absolute -top-2 left-2 flex h-6 w-fit items-center rounded-md p-2 text-sm',
            type === 'info' ? 'bg-blue-500 text-blue-50 dark:bg-blue-700' : '',
            type === 'note' ? 'bg-purple-500 text-purple-50 dark:bg-purple-700' : '',
            type === 'success' ? 'bg-green-500 text-green-50 dark:bg-green-700' : '',
            type === 'warning' ? 'bg-yellow-400 text-yellow-50 dark:bg-yellow-600' : '',
            type === 'error' ? 'bg-red-500 text-red-50 dark:bg-red-700' : ''
          )}
        >
          {type.charAt(0).toUpperCase()}
          {type.slice(1)}
        </div>
      )}

      {children}
    </div>
  );
};
