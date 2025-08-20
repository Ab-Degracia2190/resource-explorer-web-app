import React from "react";

interface PrimaryLoaderProps {
    overlay?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

const PrimaryLoader: React.FC<PrimaryLoaderProps> = ({ overlay = false, size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12', 
        lg: 'w-16 h-16'
    };

    const PokeballSpinner = () => (
        <div className={`relative ${sizeClasses[size]} animate-spin`}>
            {/* Pokeball */}
            <div className="w-full h-full rounded-full border-4 border-gray-800 dark:border-white bg-gradient-to-b from-red-500 to-red-600 relative overflow-hidden">
                {/* Top half */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500 rounded-t-full"></div>
                
                {/* Bottom half */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white rounded-b-full"></div>
                
                {/* Middle line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 dark:bg-white transform -translate-y-1/2"></div>
                
                {/* Center circle */}
                <div className="absolute top-1/2 left-1/2 w-1/3 h-1/3 bg-white border-2 border-gray-800 dark:border-white rounded-full transform -translate-x-1/2 -translate-y-1/2">
                    <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-gray-800 dark:bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                
                {/* Highlight effect */}
                <div className="absolute top-1 left-1 w-1/4 h-1/4 bg-white opacity-30 rounded-full blur-sm"></div>
            </div>
        </div>
    );

    return overlay ? (
        <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="flex flex-col items-center gap-4">
                <PokeballSpinner />
            </div>
        </div>
    ) : (
        <div className="flex justify-center">
            <PokeballSpinner />
        </div>
    );
};

export default PrimaryLoader;