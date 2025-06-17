import { Observable, ReplaySubject } from 'rxjs';

/**
 * Interface Base Service.
 *
 * @description
 * This interface is provided as a base for implementing
 * services that need to be initialized.
 * @author M. Sancho
 */
export declare interface ServiceInterface {
  /**
   * A public observable to tell subscribers when service is ready
   * to be used.
   */
  ready$: ReplaySubject<boolean>;

  /**
   * A callback method that is invoked inmediately inside constructor
   * or manually upon initialization.
   * It is invoked only once.
   */
  init(): Observable<boolean>;
}
