import React from 'react';

const LoadingComponent = ({ loading }) => {
    return (
        <div className={ `fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 z-50 ${loading ? '' : 'hidden'}` }>
            <div className="bg-white p-4 rounded-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                <p className="text-gray-900 mt-2">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingComponent;