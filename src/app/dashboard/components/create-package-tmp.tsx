'use client';

import { createPackage } from '@/api/package/create-package';

export const CreatePackageTmp = () => {
  return (
    <button onClick={() => {
      createPackage({
        'seller_user_id': '1',
        'broker_user_id': '1',
        'title': 'Sample Package 6',
        'description': 'Here is the sample package description.',
        'keywords': 'word1, word2, word3',
        'industry_id': 1,
        'visibility': 1
      });
    }}>Create Package</button>
  );
};
