import React, { useState, useEffect } from 'react';
import * as fcl from "@onflow/fcl";
import * as t from '@onflow/types';

import FetchNFTs from '../cadence/scripts/FetchNFTsFromLinkedAccts.cdc';

type Thumbnail = {
  url: string;
};

type Moment = {
  name: string;
  description: string;
  thumbnail: Thumbnail;
};

type MomentsData = {
  [momentId: string]: Moment;
};

type ApiResponse = {
  [address: string]: MomentsData;
};

interface AddressDisplayProps {
  address: string;
}

const ChildAddressDisplay: React.FC<AddressDisplayProps> = ({ address }) => {
  const [responseData, setResponseData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchLinkedAddresses = async () => {
      if (!address) return;

      try {
        const cadenceScript = FetchNFTs;

        // Fetch the linked addresses
        const response: ApiResponse = await fcl.query({
          cadence: cadenceScript,
          args: () => [fcl.arg(address, t.Address)],
        });

        console.log(JSON.stringify(response, null, 2));

        setResponseData(response);
      } catch (error) {
        console.error("Error fetching linked addresses:", error);
      }
    };

    fetchLinkedAddresses();
  }, [address]);

  // Type-checking function to validate moment structure
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isValidMoment = (moment: any): moment is Moment => {
    const isValid =
      typeof moment.name === 'string' &&
      typeof moment.description === 'string' &&
      moment.thumbnail &&
      typeof moment.thumbnail.url === 'string';

    if (!isValid) {
      console.warn('Invalid moment data:', moment);
    }

    return isValid;
  };

  // Function to render moments with validation
  const renderMoments = (data: ApiResponse) => {
    return Object.entries(data).map(([addr, moments]) => (
      <div key={addr} className="border border-gray-300 rounded-lg shadow-sm p-4 mb-6 bg-white">
        <h4 className="text-lg font-semibold mb-4 text-gray-800">Linked Wallet: {addr}</h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(moments).map(([momentId, moment]) => (
            isValidMoment(moment) ? (
              <div key={momentId} className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-200 bg-gray-50">
                <h5 className="text-md font-bold text-blue-600 mb-2">{moment.name}</h5>
                <p className="text-sm text-gray-600 mb-4">{moment.description}</p>
                <img src={moment.thumbnail.url} alt={moment.name} className="w-full h-32 object-cover rounded" />
              </div>
            ) : null
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {address ? (
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Moments Data:</h3>
          <div>
            {responseData ? renderMoments(responseData) : (
              <p className="text-gray-500">No Moments Data Available</p>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8">No Address Provided</div>
      )}
    </div>
  );
};

export default ChildAddressDisplay;
