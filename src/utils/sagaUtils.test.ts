import {
  XHRMethod,
  createActionType,
  createRequestAction,
  
  addParamsToURL,
} from 'utils';

const DELIVERY_REQUEST = createActionType(XHRMethod.Post, 'DELIVERY_REQUEST');

describe('addParamsToURL', () => {
  it('does not add additional props as params from action creator to the url', () => {

    const url = '/v1/delivery';
    const returnedUrl = '/v1/delivery';

    const getDeliveryRequest = createRequestAction(DELIVERY_REQUEST, url);
    const filter = getDeliveryRequest({
      payload: {
        a: 1,
        b: 2,
      },
    });

    expect(addParamsToURL(filter)).toEqual(returnedUrl);
  });

  it('replaces params in the url by new values from filter object', () => {
    const url = '/v1/delivery/:id/slots?slotId={slotId}';
    const returnedUrl = '/v1/delivery/50/slots?slotId=25';

    const getDeliveryRequest = createRequestAction(DELIVERY_REQUEST, url);
    const filter = getDeliveryRequest({
      routeParams: { id: 50 },
      slotId: 25,
    });

    expect(addParamsToURL(filter)).toEqual(returnedUrl);
  });

  it('replaces 2 params in the url by new values from filter object', () => {
    const url = '/v1/delivery/:id/slots/:slotId';
    const returnedUrl = '/v1/delivery/50/slots/25';

    const getDeliveryRequest = createRequestAction(DELIVERY_REQUEST, url);
    const filter = getDeliveryRequest({
      routeParams: {
        id: 50,
        slotId: 25,
      },
    });

    expect(addParamsToURL(filter)).toEqual(returnedUrl);
  });

  it('adds limit and ofset if they are present on filter object', () => {
    const url = '/v1/delivery?limit={limit}&offset={offset}';
    const returnedUrl = '/v1/delivery?limit=50&offset=100';

    const getDeliveryRequest = createRequestAction(DELIVERY_REQUEST, url);
    const filter = getDeliveryRequest({
      limit: 50,
      offset: 100,
    });

    expect(addParamsToURL(filter)).toEqual(returnedUrl);
  });

  it('adds limit and ofset if they are not present on filter object', () => {
    const url = '/v1/delivery';
    const returnedUrl = '/v1/delivery?limit=50&offset=100';

    const getDeliveryRequest = createRequestAction(DELIVERY_REQUEST, url);
    const filter = getDeliveryRequest({
      limit: 50,
      offset: 100,
    });

    expect(addParamsToURL(filter)).toEqual(returnedUrl);
  });
});
