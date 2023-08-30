'use client';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/components/ui/notification/atlus-notification';

export const TestComponentsHelper = () => {


  return (
    <div>
      <button onClick={() => showSuccessNotification({ text: 'Success' })}>Show Success
        Notification
      </button>
      <button onClick={() => showErrorNotification({ text: 'Invalid session' })}>Show Error
        Notification
      </button>

      {/*<AtlusAlertModal*/}
      {/*  isOpen={true}*/}
      {/*  title='Remove family?'*/}
      {/*  text='Remove this family and its patents from your package.'*/}
      {/*  mainButton={{*/}
      {/*    text: 'Remove',*/}
      {/*    onClick: () => console.log('Remove clicked')*/}
      {/*  }}*/}
      {/*  secondaryButton={{*/}
      {/*    text: 'Cancel',*/}
      {/*    onClick: () => console.log('Canceled')*/}
      {/*  }}*/}
      {/*/>*/}
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
