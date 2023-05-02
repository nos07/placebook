import React from 'react';

export default function Page({ params }: any) {
  return (
    <div className="container mx-auto my-10">
      <div className="w-1/2 mx-auto border border-gray-700">
        Book page {JSON.stringify(params, null, 2)}
      </div>
    </div>
  );
}