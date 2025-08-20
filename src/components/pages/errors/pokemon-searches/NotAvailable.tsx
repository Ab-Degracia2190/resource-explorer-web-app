import React from 'react';
import { AlertCircle } from 'lucide-react';
import PrimaryButton from '@/components/partials/buttons/Primary';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  onRetry,
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center ${className}`}>
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
          <AlertCircle className="h-10 w-10 text-red-500 dark:text-red-400" />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping opacity-75"></div>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {message}
      </p>
      
      {onRetry && (
        <PrimaryButton
          label="Try Again"
          onClick={onRetry}
          className="!bg-gradient-to-r !from-red-500 !to-red-600 hover:!from-red-600 hover:!to-red-700"
        />
      )}
    </div>
  );
};

export default ErrorMessage;