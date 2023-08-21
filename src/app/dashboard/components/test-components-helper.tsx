'use client';

import { useAtlusNotification } from '@/components/ui/notification/use-atlus-notification';

export const TestComponentsHelper = () => {

  const { showSuccessNotification } = useAtlusNotification();

  return (
    <div>
      <button onClick={showSuccessNotification}>Show Notification</button>
      {/*<button onClick={() => {*/}
      {/*  createPackage({*/}
      {/*    'seller_user_id': '1',*/}
      {/*    'broker_user_id': '1',*/}
      {/*    'title': 'Sample Package 6',*/}
      {/*    'description': 'Here is the sample package description.',*/}
      {/*    'keywords': 'word1, word2, word3',*/}
      {/*    'industry_id': 1,*/}
      {/*    'visibility': 1*/}
      {/*  });*/}
      {/*}}>Create Package*/}
      {/*</button>*/}
    </div>
  );
};
