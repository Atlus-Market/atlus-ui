import { getPackages } from '@/api/package/get-packages';
import { isRequestCanceledError } from '@/api/api';

class TitleValidator {

  private controller: AbortController | undefined;

  constructor(private packageId: string | undefined) {
  }

  validate(title: string | undefined): Promise<boolean> {
    this.controller?.abort();
    this.controller = new AbortController();
    return this.isTitleAvailable(title);
  }

  private async isTitleAvailable(title: string | undefined): Promise<boolean> {
    if (!title) {
      return false;
    }

    try {
      console.log('---------------');
      console.log('validating title: ', title);
      const { packages: packagesListItems } = await getPackages(this.controller?.signal);
      const p = packagesListItems.find(packageListItem => title === packageListItem.title);
      console.log('found package: ', p);
      console.log('result: ', !p);

      // if(title.length% 2===0){
      //   await sleep()
      // }

      return !p;
    } catch (e: any) {
      if (isRequestCanceledError(e)) {
        console.log('isRequestCanceledError... ', e);
      }
      return false;
    }
  }
}
